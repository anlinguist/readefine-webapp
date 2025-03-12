const OBFinish = (props: any) => {
  if (props.currentStep !== 9) {
    return null;
  }

  return (
    <div className='rdfn-onboarding-desc-wider'>
      <div style={{
        flex: 1,
      }}>
        <p id="ob-finish-txt">You're good to go! We hope you enjoy Readefine!</p>
      </div>
    </div>
  );
};

export default OBFinish