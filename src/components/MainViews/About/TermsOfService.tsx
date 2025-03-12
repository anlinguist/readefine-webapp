import { Title, Accordion, Space, Stack } from '@mantine/core';
import classes from './TermsOfService.module.css';
import parse from 'html-react-parser';

interface TQA {
    header: string;
    description: string;
}

export default function TermsOfService() {
  const data: TQA[] = [
    {
      header: "I. Introduction",
      description: `<p>Welcome to Readefine! Readefine rewords the internet.</p>
                    <p>These Terms and Conditions are rules for using Readefine. By using our extension and related website (this website at <a href="https://app.readefine.ai">https://app.readefine.ai</a>), you agree to these rules. If you don't agree, please don't use Readefine. Everyone who uses our extension must follow these rules.</p>
                    <p>We might change these rules sometimes. When we do, we'll put the new rules on our website. If you keep using Readefine after we change the rules, that means you agree to the new rules. It's a good idea to check the rules on our website once in a while to stay updated.</p>
                    <p>Thank you for using Readefine. We are here to make your online reading easier and better.</p>`
    },
    {
      header: "II. Acceptance of Terms",
      description: `<p>When you use Readefine, you are saying "yes" to these Terms and Conditions. These terms are important because they tell you what you can and can't do with Readefine, and what we can and can't do for you.</p>
                    <p>If you don't agree with these terms, please don't use Readefine. Using our extension and website means you accept all these rules.</p>
                    <p>It's your responsibility to understand these terms. If you're using Readefine, we'll think that you have read, understood, and agreed to these terms.</p>`
    },
    {
      header: "III. Changes to Terms and Conditions",
      description: `<p>We might need to change these rules (Terms and Conditions) from time to time. We do this to keep things up to date or if we need to add new things.</p>
                    <p>Here's how it works:</p>
                    <ul>
                        <li>When we change the terms, we'll put the new ones on our website.</li>
                        <li>Sometimes, we might also send you an email or put a message in the Readefine extension to let you know about these changes.</li>
                    </ul>`
    },
    {
      header: "IV. Description of Service",
      description: `<h4 className="privacypolicyquestion">What Readefine Offers:</h4>
                    <p className="privacypolicyanswer">Readefine is a Chrome Extension that enhances your reading experience online. It rewords website content in two primary ways:</p>
                    <ol>
                        <li><b>Dictionaries:</b>: Readefine uses dictionaries to automatically find and replace specific terms on websites with alternatives you have enabled. This feature is accessible to all users.</li>
                        <li><b>AI Rewording</b>: Users can select text on a website and reword it using AI. This can be done in a variety of ways, depending on the version of Readefine you are using.</li>
                    </ol>
                    <p className="privacypolicyanswer">We offer two versions of Readefine:</p>
                    <ul>
                        <li><b>Readefine Basic</b>: Free for all users. With Readefine Basic, you get:</li>
                        <ul>
                            <li>Dictionary-based rewording.</li>
                            <li>AI rewording with a preset list of options, using 1000 tokens per day on the GPT 3.5 Turbo model.</li>
                        </ul>
                        <li><b>Readefine Pro</b>: Our premium version for $10 per month, which includes more advanced features:</li>
                        <ul>
                            <li>All the benefits of Readefine Basic.</li>
                            <li>Enhanced AI rewording with 10,000 tokens per day on the more advanced GPT 4 Turbo model.</li>
                            <li>Custom rewording styles, giving you more flexibility and control over how text is reworded.</li>
                        </ul>
                    </ul>
                    <h4 className="privacypolicyquestion">Requirements for Use:</h4>
                    <ul>
                        <li><b>Internet Access</b>: Readefine requires an internet connection, as it processes content using our online servers.</li>
                        <li><b>Compatible Devices</b>: Readefine is designed for computers that can run the Chrome, Edge, Firefox, and Safari browsers. Readefine also supports Safari on iPhones.</li>
                    </ul>
                    <p className="privacypolicyanswer">Our goal at Readefine, whether you are using the Basic or Pro version, is to make online reading more accessible, enjoyable, and tailored to your preferences.</p>`
    },
    {
      header: "V. User Registration and Account Security",
      description: `<h4 className="privacypolicyquestion">Requirements for Use:</h4>
                    <p className="privacypolicyanswer">Signing up for Readefine is easy and quick:</p>
                    <ol>
                        <li><b>Download and Install</b>: First, download and install the Readefine Browser Extension.</li>
                        <li><b>Create an Account</b>: Open Readefine and sign up via Google, Apple, or your own email and password. If you're using Readefine Pro, you can upgrade after you sign up.</li>
                    </ol>
                    <h4 className="privacypolicyquestion">Keeping Your Account Safe:</h4>
                    <p className="privacypolicyanswer">Your account security is very important. Here's what you can do to help keep your account safe:</p>
                    <ul>
                        <li><b>Strong Passwords</b>: Choose a strong, unique password for Readefine and don't share it with anyone.</li>
                        <li><b>Update Regularly</b>: Change your password regularly and update it if you think someone else might know it.</li>
                        <li><b>Secure Your Device</b>: Make sure the device you use Readefine on is also secure. Make sure to keep your device's operating system up to date.</li>
                        <li><b>Log Out</b>: Always log out of Readefine if you're using a shared or public computer.</li>
                        <li><b>Watch for Suspicious Activity</b>: If you notice anything unusual in your account, like changes you didn't make, let us know right away.</li>
                    </ul>
                    <p className="privacypolicyanswer">Remember, you are responsible for all activity on your Readefine account. Keeping your login details confidential is a big part of keeping your account secure.</p>`
    },
    {
      header: "VI. Usage Guidelines",
      description: `<p className="privacypolicyanswer">Using Readefine means agreeing to use it responsibly. Here's what you should and shouldn't do:</p>
                    <h4 className="privacypolicyquestion">What You Should Do:</h4>
                    <ul>
                        <li>Use Readefine to make reading online easier and more interesting.</li>
                        <li>Respect others' rights and follow the law.</li>
                    </ul>
                    <h4 className="privacypolicyquestion">What You Shouldn't Do:</h4>
                    <ul>
                        <li><b>No Rewording to Harm</b>: Don't use Readefine to change words in ways that are racist, hateful, or harmful to others.</li>
                        <li><b>No Illegal Activities</b>: Don't use Readefine for any illegal activities. This includes breaking laws, regulations, or other legal requirements.</li>
                        <li><b>No Harassment</b>: Don't use Readefine to harass, bully, or upset other people.</li>
                        <li><b>No Security Breaches</b>: Don't try to harm our service or break into our systems.</li>
                        <li><b>No Misuse of AI</b>: When using the AI rewording feature, make sure not to misuse it in ways that could cause harm or spread false information.</li>
                        <li><b>No Sharing Inappropriate Content</b>: Don't use Readefine to share inappropriate or offensive content.</li>
                        <li><b>No Violation of Others' Rights</b>: Don't use Readefine to violate someone else's rights, like their privacy or intellectual property rights.</li>
                    </ul>
                    <h4 className="privacypolicyquestion">Consequences of Not Following Guidelines:</h4>
                    <p className="privacypolicyanswer">If you don't follow these rules, we might have to suspend or stop your access to Readefine. We want to keep Readefine safe and positive for everyone.</p>
                    <p className="privacypolicyanswer">Remember, these guidelines are here to make sure that Readefine is used in the best and safest way possible. We count on you to help us keep it that way.</p>`
    },
    {
      header: "VII. Intellectual Property Rights",
      description: `<h4 className="privacypolicyquestion"><b>Ownership of Readefine:</b></h4>
                    <ul>
                        <li>Everything about Readefine, including the software, design, text, images, and features, is owned by us. This is our intellectual property.</li>
                        <li>Our intellectual property also includes any updates, improvements, or new versions of Readefine.</li>
                    </ul>
                    <h4 className="privacypolicyquestion"><b>Your Rights to Use Our Intellectual Property:</b></h4>
                    <ul>
                        <li>When you use Readefine, we give you a personal, non-transferable, and non-exclusive right to use our software as part of the service. This is just for your personal, non-commercial use.</li>
                        <li>You can't copy, change, or try to figure out the source code of our software. Also, you can't sell or give away our software to someone else.</li>
                        <li>You are not allowed to use our logo, brand, or other trademarks without our permission.</li>
                    </ul>
                    <h4 className="privacypolicyquestion"><b>Your Content:</b></h4>
                    <ul>
                        <li>If you create any content using Readefine, like custom dictionary entries or reworded text, you own that content. But remember, you're responsible for making sure that this content follows our Usage Guidelines and the law.</li>
                        <li>When you create content using Readefine, you give us permission to use that content as part of providing the service. This includes storing, copying, and sharing it as needed for the service.</li>
                    </ul>
                    <h4 className="privacypolicyquestion"><b>Respecting Others' Intellectual Property:</b></h4>
                    <ul>
                        <li>Just like you're respecting our intellectual property, you should also respect others'. Don't use Readefine to copy or share content that doesn't belong to you unless you have permission from the owner.</li>
                    </ul>
                    <p className="privacypolicyanswer">Remember, these rules are here to protect the hard work that goes into creating Readefine and to respect the rights of everyone involved.</p>`
    },
    {
      header: "VIII. Subscription, Billing, and Cancellation",
      description: `<h4 className="privacypolicyquestion">Subscribing to Readefine Pro:</h4>
                    <ul>
                        <li>You can upgrade to Readefine Pro for advanced features like increased tokens and custom rewording styles.</li>
                        <li>The cost is $10 per month.</li>
                    </ul>
                    <h4 className="privacypolicyquestion">How to Upgrade:</h4>
                    <ul>
                        <li><b>On Safari (iOS and MacOS)</b>: Use Apple In-App Purchases to upgrade.</li>
                        <li><b>On Other Browsers</b>: Use Stripe to upgrade.</li>
                    </ul>
                    <h4 className="privacypolicyquestion">Billing Practices:</h4>
                    <ul>
                        <li>When you upgrade to Pro, we'll charge you $10 every month.</li>
                        <li>The payment method depends on how you upgraded:</li>
                        <ul>
                            <li>If you upgraded via Apple, all billing is handled through your Apple account.</li>
                            <li>If you upgraded via other browsers using Stripe, billing is managed through Stripe.</li>
                        </ul>
                    </ul>
                    <h4 className="privacypolicyquestion">Managing Your Subscription:</h4>
                    <ul>
                        <li>You need to manage your subscription through the same system you used to upgrade:</li>
                        <ul>
                            <li>For Apple upgrades, manage your subscription through your Apple account.</li>
                            <li>For Stripe upgrades, manage your subscription through Stripe.</li>
                        </ul>
                    </ul>
                    <h4 className="privacypolicyquestion">Cancelling Your Subscription:</h4>
                    <ul>
                        <li>You can cancel your Readefine Pro subscription any time.</li>
                        <li>If you cancel, you can still use Pro features until the end of your current billing month.</li>
                        <li>After your billing month ends, you won't be charged again, and your account will return to the Basic version.</li>
                    </ul>
                    <p className="privacypolicyanswer">Remember, whether you're using Readefine Basic or Pro, we're here to make your online reading experience better. If you have any questions about your subscription, just let us know.</p>`
    },
    {
      header: "IX. Privacy Policy",
      description: `<p className="privacypolicyanswer">Your Privacy Matters:</p>
                    <ul>
                        <li>We take your privacy seriously at Readefine. To see all the details, please read our full Privacy Policy.</li>
                    </ul>
                    <p className="privacypolicyanswer">Summary of Our Privacy Practices:</p>
                    <ul>
                        <li><b>Data Collection</b>: We collect information necessary to provide the Readefine service, like website data and user preferences.</li>
                        <li><b>Data Use</b>: The data we collect is used to deliver and improve our service. This includes things like processing text on websites and synchronizing your preferences across devices.</li>
                        <li><b>Data Protection</b>: We have strong security measures in place to keep your information safe. This includes protecting against unauthorized access and ensuring data confidentiality.</li>
                        <li><b>Sharing Information</b>: We only share your data with necessary parties, like Firebase services for authentication and data storage. We do not sell your data to third parties.</li>
                        <li><b>Your Rights</b>: You have rights regarding your data, including accessing and requesting the deletion of your information.</li>
                    </ul>
                    <p className="privacypolicyanswer">Remember, by using Readefine, you agree to the collection and use of information in accordance with our Privacy Policy. If you have any questions or concerns about how we handle your data, please feel free to contact us.</p>`
    },
    {
      header: "X. Disclaimers and Limitations of Liability",
      description: `<p className="privacypolicyanswer">Disclaimers:</p>
                    <ul>
                        <li><b>Service "As Is"</b>: We provide Readefine "as is" and "as available". This means we don't promise that the service will be perfect or without errors.</li>
                        <li><b>No Uninterrupted Service</b>: We can't guarantee that Readefine will always be available or uninterrupted. There might be times when the service is down for maintenance or due to technical issues.</li>
                        <li><b>No Endorsement</b>: The rewording by Readefine doesn't mean we endorse or agree with the content. It's just a tool to help you read things differently.</li>
                    </ul>
                    <p className="privacypolicyanswer">Limitations of Liability:</p>
                    <ul>
                        <li><b>No Liability for Damages</b>: We're not responsible for any harm or damages that might happen from using Readefine. This includes direct, indirect, accidental, special, or consequential damages.</li>
                        <li><b>Use at Your Own Risk</b>: You use Readefine at your own risk. If you're not happy with the service or something goes wrong, your only solution is to stop using Readefine.</li>
                        <li><b>Jurisdictional Limitations</b>: Some places don't allow certain disclaimers or limitations on liability, so these might not apply to you depending on where you live.</li>
                    </ul>
                    <p className="privacypolicyanswer">Remember, we work hard to make Readefine helpful and reliable, but we can't foresee or prevent every issue. Please use the service responsibly and with understanding of these limitations.</p>`
    },
    {
      header: "XI. Termination of use",
      description: `<p className="privacypolicyanswer">When We Might Terminate Your Access:</p>
                    <ul>
                        <li><b>Breaking the Rules</b>: If you don't follow our Terms and Conditions or Usage Guidelines, we might have to stop your access to Readefine. This includes things like illegal activities, harassment, or trying to harm our service.</li>
                        <li><b>Misuse of the Service</b>: Using Readefine in ways it's not meant to be used, like tampering with the software or using it to spread harmful or false information, can lead to termination.</li>
                        <li><b>Security Risks</b>: If your use of Readefine poses a security risk or potentially harms other users, we may need to terminate your access.</li>
                    </ul>
                    <p className="privacypolicyanswer">Consequences of Termination:</p>
                    <ul>
                        <li><b>Loss of Access</b>: If your access to Readefine is terminated, you won't be able to use the extension or its features anymore.</li>
                        <li><b>No Refunds</b>: If you're a Readefine Pro user, remember that termination means you lose access to the Pro features, and we don't offer refunds for the time left in your subscription.</li>
                        <li><b>Data Retention</b>: After termination, we might keep some of your data as required by law or for legitimate business purposes.</li>
                    </ul>
                    <p className="privacypolicyanswer"><b>Final Decision</b>: We make the final decision on whether to terminate a user's access. We don't take this decision lightly and will consider each situation carefully.</p>
                    <p className="privacypolicyanswer">Remember, we want Readefine to be a safe and enjoyable service for everyone. Following our Terms and Conditions helps us keep it that way.</p>`
    }
  ]

  return (
    <Stack mih={"rem(650px)"}>
      <Title ta="center" className={classes.title}
      >
        Terms of Service
      </Title>
    <Space h="lg" />

      <Accordion variant="separated">
                {data.map((item: any, index: any) => (
                    <Accordion.Item key={index} className={classes.item} value={item.header}>
                        <Accordion.Control>{item.header}</Accordion.Control>
                        <Accordion.Panel>{parse(item.description)}</Accordion.Panel>
                    </Accordion.Item>
                ))}</Accordion>
                <h4>Consent</h4>
                <p>By using our website, you consent to our Privacy Policy and agree to its Terms and Conditions.</p>
    </Stack>
  );
}