import { useEffect, useState } from 'react'

function CurrentSubscription({
    currentSubscriptionTitle
}: any) {
    const [tokenCount, setTokenCount] = useState(0);
    const [model, setModel] = useState("GPT-3.5 Turbo");
    useEffect(() => {
        switch (currentSubscriptionTitle) {
            case 'Basic':
                // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
                setTokenCount('1,000');
                setModel("GPT-3.5 Turbo");
                break;
            case 'Plus':
                // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
                setTokenCount('5,000');
                setModel("GPT-4 Turbo");
                break;
            case 'Pro':
                // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
                setTokenCount('10,000');
                setModel("GPT-4 Turbo");
                break;
            default:
                setTokenCount(1000);
                setModel("GPT-3.5 Turbo");
                break;
        }
    }, [currentSubscriptionTitle])

  return (
    <div>
        {
            <h3>{`You're on the ${currentSubscriptionTitle} Readefine AI Subscription, which includes ${tokenCount} tokens and uses ${model}.`}</h3>
        }
        {
            currentSubscriptionTitle !== "Basic" &&
            <button onClick={(() => {
                window.location.assign("https://billing.stripe.com/p/login/14k8A1cm2aOt1Ec4gg")
            })}>{`Manage your ${currentSubscriptionTitle} subscription`}</button>
        }
    </div>
  )
}

export default CurrentSubscription