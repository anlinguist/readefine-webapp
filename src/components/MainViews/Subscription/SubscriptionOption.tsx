/*global browser*/
import { Button, Stack, Text } from '@mantine/core';
import { useState, useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const SubscriptionOption = ({
    title,
    features,
    price,
    handleCheckout,
    bestValue,
    currentSubscription
}: any) => {
    const [loading, setLoading] = useState(false);
    const [browserIsSafari, setBrowserIsSafari] = useState(false);

    const isSafari = () => {
        // Check for Safari using user agent string
        const userAgent = window.navigator.userAgent;
        const isSafariUA = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
    
        // Additional CSS check (useful for distinguishing Safari from other browsers)
        const cssCheck = () => {
            const el = document.createElement('div');
            el.style.cssText = 'position: sticky; -webkit-backdrop-filter: blur(10px);';
            return el.style.position === 'sticky' && !!(el.style as any).webkitBackdropFilter;
        };
    
        return isSafariUA && cssCheck();
    };

    const handleManageSubscription = async(e: any) => {
        e.preventDefault();
        setLoading(true);
        if (browserIsSafari) {
            // @ts-expect-error TS(2304): Cannot find name 'browser'.
            let response = await browser.runtime.sendMessage("com.getreadefine.readefine.Extension (QK39SRR4H5)", { openInAppPurchases: true, target: title })
            // send message to safari extension to prompt the in app purchase logic
            // if it's the current extension, open current subscription.
            // if it's a new subscription, open the checkout page.
        } else {
            currentSubscription ? window.location.assign("https://billing.stripe.com/p/login/14k8A1cm2aOt1Ec4gg") : handleCheckout();
        }
    }
    
    useEffect(() => {
        if (isSafari()) {
            console.log("browser is safari 25")
            setBrowserIsSafari(true);
        } else {
            console.log("browser is not safari")
            setBrowserIsSafari(false);
        }
    }, []);
    
    useEffect(() => {
        console.log("currentSubscription: ", currentSubscription)
    }, [currentSubscription])

  return (
      <div className="price-option">
          {
              bestValue &&
              <div className="best-value-badge">
                  Current Plan
              </div>
          }
          <div className="subscription-option-top">
              <h2 className='subscription-option-name'>{title}</h2>
              <div className="subscription-option-price">
                  {
                      price || price === 0 ?
                      (
                          price !== 0 ?
                          <>
                              <Text size='xxxl'>{`$${price}`}</Text>
                              <Text>/month</Text>
                          </> : <Text size='xxxl'>Free</Text>
                      )
                      :
                        <div className="loader" />
                  }
              </div>
          </div>
          <Stack flex={1} p={'20px'} justify='space-between'>
              <div className="features">
              {features.map((feature: any, index: any) => (
                  <div key={index} className="subscription-option-feature">
                      <FaCheckCircle className='subscription-option-feature-icon'/>
                      <p>{feature}</p>
                  </div>
              ))}
              </div>
              {
                  (title !== 'Basic') &&
                  <Button mb={0} autoContrast w={'100%'} onClick={handleManageSubscription} loading={loading} variant="filled" type='submit' color='rdfnyellow.6' radius="md" m={"10px 0 0 0"}>{currentSubscription ? 'Manage' : 'Subscribe'}</Button>
              }
          </Stack>
      </div>
  );
}

export default SubscriptionOption;