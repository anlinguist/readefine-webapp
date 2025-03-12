import { useEffect, useState } from "react";
import { Logout } from '../../../services/logout';
import { useAuth } from '../../../contexts/AuthContext';
import { Button, Checkbox } from "@mantine/core";

function Uninstall() {
  const { loading } = useAuth();
  const { makeRdfnRequest } = useAuth();
  const [uninstallLoader, setUninstallLoader] = useState(false);

  // Track chosen reasons for install/uninstall
  const [whyInstall, setWhyInstall] = useState<string[]>([]);
  const [whyUninstall, setWhyUninstall] = useState<string[]>([]);

  // Track "Other" text
  const [installOther, setInstallOther] = useState('');
  const [uninstallOther, setUninstallOther] = useState('');

  // Helper: toggles a reason in an array state (adds if not present, removes if present)
  const toggleReason = (
    reasonArray: string[], 
    setReasonArray: (val: string[]) => void, 
    reason: string
  ) => {
    if (reasonArray.includes(reason)) {
      // remove it
      setReasonArray(reasonArray.filter((r) => r !== reason));
    } else {
      // add it
      setReasonArray([...reasonArray, reason]);
    }
  };

  // Called when a user checks or unchecks an INSTALL-related checkbox
  const handleInstallCheckboxChange = (reason: string) => {
    toggleReason(whyInstall, setWhyInstall, reason);
  };

  // Called when a user checks or unchecks an UNINSTALL-related checkbox
  const handleUninstallCheckboxChange = (reason: string) => {
    toggleReason(whyUninstall, setWhyUninstall, reason);
  };

  // Whether we have any selection or typed text (for enabling/disabling the submit button)
  const canSubmit = (
    whyInstall.length > 0 ||
    whyUninstall.length > 0 ||
    installOther.trim() !== '' ||
    uninstallOther.trim() !== ''
  );

  // Called when the user submits the form
  const uninstallSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    // If nothing is selected or typed, block the submission
    if (!canSubmit) {
      alert("Please select at least one reason or type something in 'Other' before submitting.");
      return;
    }

    // Build final object
    const sendObj = {
      whyInstall: [...whyInstall],
      whyUninstall: [...whyUninstall],
    };

    // Add 'Other' text if non-empty
    if (installOther.trim()) {
      sendObj.whyInstall.push(installOther.trim());
    }
    if (uninstallOther.trim()) {
      sendObj.whyUninstall.push(uninstallOther.trim());
    }

    setUninstallLoader(true);

    // Submit data
    const path = "/uninstalledForm";
    await makeRdfnRequest(path, "POST", {}, sendObj, true);

    // Redirect after submission
    window.location.href = "https://app.readefine.ai";
  };

  const routeUninstall = async () => {
    const path = '/uninstalled';
    await makeRdfnRequest(path, 'GET', {}, null, true);
    Logout();
  };

  useEffect(() => {
    if (!loading) {
      routeUninstall();
    }
  }, [loading]);

  return (
    <div className="about">
      <h2 id="uninstall-thanks">Thanks for trying Readefine!</h2>
      <p>
        We&apos;re sad you&apos;ve decided to uninstall Readefine, but we&apos;d love to learn
        from you. Would you mind filling out a brief survey?
      </p>
      <p>
        You can always reinstall Readefine. If you have questions about Readefine, check out our
        blog or email us at admin@getreadefine.com.
      </p>

      <form id="uninstallform" onSubmit={uninstallSubmitForm}>
        <div>
          <h3>Why did you install Readefine?</h3>
          <div id="whyinstall">
            <div className="uninstalloption">
              <span> To help read online content </span>
              <Checkbox
                autoContrast
                checked={whyInstall.includes("To help read online content")}
                onChange={() => handleInstallCheckboxChange("To help read online content")}
                value="To help read online content"
                className="whyinstall"
                color="rdfnyellow.6"
                radius="xl"
                size="xl"
              />
            </div>

            <div className="uninstalloption">
              <span> To learn the vocabulary of a new topic or language </span>
              <Checkbox
                autoContrast
                checked={whyInstall.includes("To learn the vocabulary of a new topic or language")}
                onChange={() => handleInstallCheckboxChange("To learn the vocabulary of a new topic or language")}
                value="To learn the vocabulary of a new topic or language"
                className="whyinstall"
                color="rdfnyellow.6"
                radius="xl"
                size="xl"
              />
            </div>

            <div className="uninstalloption">
              <span> To help with acronyms and business terminology </span>
              <Checkbox
                autoContrast
                checked={whyInstall.includes("To help with acronyms and business terminology")}
                onChange={() => handleInstallCheckboxChange("To help with acronyms and business terminology")}
                value="To help with acronyms and business terminology"
                className="whyinstall"
                color="rdfnyellow.6"
                radius="xl"
                size="xl"
              />
            </div>

            <div className="uninstalloption">
              <span> To help with schoolwork </span>
              <Checkbox
                autoContrast
                checked={whyInstall.includes("To help with schoolwork")}
                onChange={() => handleInstallCheckboxChange("To help with schoolwork")}
                value="To help with schoolwork"
                className="whyinstall"
                color="rdfnyellow.6"
                radius="xl"
                size="xl"
              />
            </div>

            <div className="uninstalloption textarea">
              <span> Other: </span>
              <textarea
                id="installother"
                className="whyinstall"
                value={installOther}
                onChange={(e) => setInstallOther(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <h3>Why did you uninstall Readefine?</h3>
          <div id="whyuninstall">
            <div className="uninstalloption">
              <span> There weren&apos;t enough Readefinitions </span>
              <Checkbox
                autoContrast
                checked={whyUninstall.includes("There weren't enough Readefinitions")}
                onChange={() => handleUninstallCheckboxChange("There weren't enough Readefinitions")}
                value="There weren't enough Readefinitions"
                className="whyuninstall"
                color="rdfnyellow.6"
                radius="xl"
                size="xl"
              />
            </div>

            <div className="uninstalloption">
              <span> There were too many Readefinitions </span>
              <Checkbox
                autoContrast
                checked={whyUninstall.includes("There were too many Readefinitions")}
                onChange={() => handleUninstallCheckboxChange("There were too many Readefinitions")}
                value="There were too many Readefinitions"
                className="whyuninstall"
                color="rdfnyellow.6"
                radius="xl"
                size="xl"
              />
            </div>

            <div className="uninstalloption">
              <span> Readefine didn&apos;t solve my problem </span>
              <Checkbox
                autoContrast
                checked={whyUninstall.includes("Readefine didn't solve my problem")}
                onChange={() => handleUninstallCheckboxChange("Readefine didn't solve my problem")}
                value="Readefine didn't solve my problem"
                className="whyuninstall"
                color="rdfnyellow.6"
                radius="xl"
                size="xl"
              />
            </div>

            <div className="uninstalloption">
              <span> Readefine didn&apos;t work </span>
              <Checkbox
                autoContrast
                checked={whyUninstall.includes("Readefine didn't work")}
                onChange={() => handleUninstallCheckboxChange("Readefine didn't work")}
                value="Readefine didn't work"
                className="whyuninstall"
                color="rdfnyellow.6"
                radius="xl"
                size="xl"
              />
            </div>

            <div className="uninstalloption textarea">
              <span> Other: </span>
              <textarea
                id="uninstallother"
                className="whyuninstall"
                value={uninstallOther}
                onChange={(e) => setUninstallOther(e.target.value)}
              />
            </div>
          </div>
        </div>

        <Button
          autoContrast
          color="rdfnyellow.6"
          type="submit"
          loading={uninstallLoader}
          radius="xl"
          size="lg"
          w="100%"
          maw="300px"
          display="block"
          m="40px auto"
          // Disable if no selected reasons or typed text
          disabled={!canSubmit}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Uninstall;