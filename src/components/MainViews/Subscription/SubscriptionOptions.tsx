import { useContext, useEffect, useState } from 'react'
import SubscriptionOption from './SubscriptionOption'
import { getApp } from "@firebase/app";
import { createCheckoutSession, getStripePayments } from '@stripe/firestore-stripe-payments';
import { RDFNContext } from '../../../RDFNContext';

function SubscriptionOptions() {
    // @ts-expect-error TS(2339): Property 'proStatus' does not exist on type 'unkno... Remove this comment to see the full error message
    const { proStatus } = useContext(RDFNContext);
    const [payments, setPayments] = useState(false);
    const [currentSubscriptionTitle, setCurrentSubscriptionTitle] = useState("Basic");
    const app = getApp();

    useEffect(() => {
      if (!payments) {
        // @ts-expect-error TS(2345): Argument of type 'StripePayments' is not assignabl... Remove this comment to see the full error message
        setPayments(getStripePayments(app, {
          productsCollection: "products",
          customersCollection: "customers",
        }))
        return;
      }
      if (proStatus) {
        setCurrentSubscriptionTitle("Pro")
      } else {
        setCurrentSubscriptionTitle("Basic")
      }
    }, [payments, proStatus])
    
    const beginCheckout = async (priceId: any) => {
      // @ts-expect-error TS(2345): Argument of type 'boolean' is not assignable to pa... Remove this comment to see the full error message
      const session = await createCheckoutSession(payments, {
        price: priceId,
        line_items: [
          {
            price: priceId,
            quantity: 1
          },
        ],
        allow_promotion_codes: true,
        mode: 'subscription'
      });
      window.location.assign(session.url);
    }
    const options = [
      {
        title: 'Basic',
        features: ['10,000 tokens/day', 'GPT-4o Mini', 'Basic rewording styles'],
        price: 0,
        priceId: "price_1OCBShDearBQcNOICjerdgmy",
        bestValue: false
      },
      {
        title: 'Pro',
        features: ['50,000 tokens/day', 'o3 Mini', 'Custom rewording styles'],
        price: 10,
        priceId: "price_1OCBTfDearBQcNOIQMKMIyFy",
        bestValue: false
      },
    ];

  return (
    <div className="price-options">
            {options.map((option, index) => {
              return (
                <SubscriptionOption
                    key={index}
                    title={option.title}
                    features={option.features}
                    price={option.price}
                    handleCheckout={() => beginCheckout(option.priceId)}
                    bestValue={option.title === currentSubscriptionTitle}
                    currentSubscription={option.title === currentSubscriptionTitle}
                />
            )})}
        </div>
  )
}

export default SubscriptionOptions