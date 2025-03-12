import { Title, Accordion, Text, Space, Stack } from '@mantine/core';
import classes from './PrivacyPolicy.module.css';
import parse from 'html-react-parser';

interface PPQA {
    question: string;
    answer: string;
}

export default function PrivacyPolicy() {
    const data: PPQA[] = [
        {
            question: "I. What kind of log data do you collect?",
            answer: "Readefine follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information."
        },
        {
            question: "II. What kinds of information do we collect?",
            answer: `<ul>
            <li className="privacypolicyanswer">To provide the Readefine experience, we process the websites that you visit and collect specific data essential for our services. Below are the types of information we collect and how they are used:</li>
              <ol>
                <li><b>Website Data Collection</b>: Readefine collects the text data on any website that you visit and processes that text. It is possible that some of the information processed could be used to identify you. However, we ensure strict privacy controls and data security measures are in place to protect your information.</li>
                <li><b>Firebase Authentication</b>: For user authentication, we utilize Firebase, a platform developed by Google. When you sign up or log in, Firebase processes your login credentials. We do not store your passwords or sensitive authentication data. Firebase may collect information like your IP address and login timestamps for security purposes.</li>
                <li><b>Firestore Data Storage</b>: We use Firestore, a cloud-based database, to store your user information securely. This includes your Firebase User ID (UID), username, and email address. The purpose of storing this data is to personalize and enhance your experience with Readefine, providing continuity and synchronization across different devices.</li>
                <li><b>User Preferences and Settings</b>: We store information about your interactions with Readefine, such as the websites you block Readefine from running on, and your custom Readefine dictionary. This information is stored to synchronize your preferences across different devices and to provide a consistent user experience.</li>
              </ol>
            <li className="privacypolicyanswer">Your data privacy and security are of utmost importance to us. We implement rigorous measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. We regularly review our data collection, storage, and processing practices, including physical security measures, to guard against unauthorized access to systems.</li>
          </ul>`
        },
        {
            question: "III. How do we use that information?",
            answer: `<ul>
            <li className="privacypolicyanswer">The information we collect is integral to delivering the Readefine service and enhancing user experience. Here's how we use this data:</li>
            <ol>
              <li><b>Delivering Our Service</b>: The core functionality of Readefine involves processing the text data from websites you visit. This processing is done to provide the rewording service that defines the Readefine experience. Your information is sent to our servers, processed, and then returned to your device in the refined format.</li>
              <li><b>Synchronizing User Preferences</b>: For a consistent user experience across multiple devices, we store and use your preferences, such as the websites where Readefine is disabled and your personalized Readefine dictionary. This ensures that your settings are the same, regardless of the device you use to access our service.</li>
              <li><b>Integration with Klaviyo</b>: Upon signing up for Readefine, we automatically add you to our Readefine list in Klaviyo. This enables us to send you emails related to our service, including updates, news, and promotional content. Your email address and name are shared with Klaviyo for this purpose. We respect your privacy and offer easy options to unsubscribe from these communications at any time.</li>
              <li><b>Pro Version Payments and Management</b>: If you choose to upgrade to our Pro version, we use Stripe and Apple In-App Purchases for payment processing. This involves associating your Readefine account with the account that you use to purchase Readefine Pro in Stripe or Apple. We handle this information with the highest level of security and confidentiality, ensuring that your payment data is used solely for the purpose of processing your subscription to the Pro version.</li>
            </ol>
            <li className="privacypolicyanswer">We are committed to using your information responsibly and enhancing your experience with Readefine while maintaining your privacy and trust. Our practices are designed to be in your best interest, aiming to provide a seamless, secure, and enjoyable experience with our product.</li>
          </ul>`
        },
        {
            question: "IV. How is this information shared?",
            answer: `<ul>
            <li className="privacypolicyanswer">We value your privacy and are committed to ensuring the confidentiality and security of your personal information. Here is an overview of how and with whom your information may be shared:</li>
            <ol>
              <li><b>Firebase and Firestore</b>: For user authentication and data storage, we use Firebase and Firestore, respectively. These Google Cloud services may access the necessary data for authentication and storage purposes, such as your UID, username, and email. This data is used solely for the functionality of Readefine and is not shared with other third parties. Google Cloud adheres to strict privacy and security standards to ensure your data is protected.</li>
              <li><b>Klaviyo Integration</b>: When you sign up for Readefine, your email address and name are shared with Klaviyo for email communication purposes. This enables us to send you updates, news, and promotional offers related to Readefine. Klaviyo is a trusted email marketing platform that complies with privacy regulations and standards, ensuring the secure handling of your information.</li>
              <li><b>Stripe and Apple In-App Purchases</b>: For processing payments for the Pro version of Readefine, we collaborate with Stripe and Apple In-App Purchases. This involves sharing relevant transactional data with these platforms to facilitate your subscription. Both Stripe and Apple are renowned for their robust security measures and privacy safeguards, ensuring that your payment information is handled with utmost care and confidentiality.</li>
              <li><b>Non-Disclosure to Third Parties</b>: Apart from the aforementioned, we do not share your personal information with any third-party entities. Any sharing of data is strictly limited to what is necessary for providing and improving the Readefine service, and is done with your privacy as our top priority.</li>
            </ol>
            <li className="privacypolicyanswer">We regularly review and update our sharing practices to ensure they align with the highest standards of data protection and privacy laws. Our commitment is to maintain the trust you place in us by responsibly managing and safeguarding your information.</li>
          </ul>`
        },
        {
            question: "V. How will we notify you of changes to this policy?",
            answer: `<ul>
            <li className="privacypolicyanswer">We will update this policy as our business needs and applicable laws demand. We will keep our dedication to keeping your information private, and we will notify you by email of any significant changes that affect your privacy rights.</li>
          </ul>`
        },
        {
            question: "VI. How to contact Readefine with questions.",
            answer: `<ul>
            <li className="privacypolicyanswer">You can contact us with any questions about this Privacy Policy by filling out <a href="https://app.readefine.ai?modal=contact-us">this form</a> or contacting us at admin@getreadefine.com.</li>
          </ul>`
        },

    ]
    return (
        <Stack mih={"rem(650px)"}>
            <Title ta="center" className={classes.title}>
                Privacy Policy
            </Title>
            <Space h="lg" />

            <Text >
                At Readefine, accessible from https://app.readefine.ai, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Readefine and how we use it.
            </Text>
            <Space h="lg" />
            <Text >
                If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
            </Text>
            <Space h="lg" />
            <Accordion variant="separated">
                {data.map((item: any, index: any) => (
                    <Accordion.Item key={index} className={classes.item} value={item.question}>
                        <Accordion.Control>{item.question}</Accordion.Control>
                        <Accordion.Panel>{parse(item.answer)}</Accordion.Panel>
                    </Accordion.Item>
                ))}
            </Accordion>
            <h4>Consent</h4>
            <p>By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.</p>
        </Stack>
    );
}