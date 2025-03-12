import "./MultiStepProgressBar.css";
import "react-step-progress-bar/styles.css";
import { Button, Group, Progress, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import classes from "./MultiStepProgressBar.module.css";

const MultiStepProgressBar = ({prevItem, currentStep, goTo, nextItem, blockNext, stepComponents}: any) => {
  const [stepPercentage, setStepPercentage] = useState(0);

  useEffect(() => {
    let percent = (100/Object.keys(stepComponents).length)*currentStep;
    percent = percent > 100 ? 100 : percent;
    setStepPercentage(percent);
  }, [currentStep]);

  return (
    <Stack classNames={{
      root: classes.stack
    }}>
      <Group justify="space-between">
        {/* previous/next buttons */}
        <Button autoContrast variant="filled" color='rdfnyellow.6' size="md" radius="md" m={"10px 0 0 0"} onClick={prevItem} disabled={currentStep === 1}>
          Previous
        </Button>
        {/* next or restart */}
        {
          // if currentStep is last key of stepComponents
          currentStep === Object.keys(stepComponents).length &&
            <Button  autoContrast variant="filled" color='rdfnyellow.6' size="md" radius="md" m={"10px 0 0 0"} onClick={() => goTo(1)}>
              Restart
            </Button>
        }
        {
          currentStep !== Object.keys(stepComponents).length &&
          <Button  autoContrast variant="filled" color='rdfnyellow.6' size="md" radius="md" m={"10px 0 0 0"} onClick={() => nextItem()} disabled={blockNext}>
            Next
          </Button>
          }
      </Group>
      <Progress classNames={{
        root: classes.progress,
        section: classes.section,
      }} h={'15px'} color={'rdfnyellow.6'} value={stepPercentage} size="lg" transitionDuration={300} />
    </Stack>
  );
};

export default MultiStepProgressBar;