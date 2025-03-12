function Footer() {
  return (
    <div className="footer">
      <div id="copyrights" className="footerline">{(new Date()).getFullYear()} © Readefine LLC</div>
    </div>
  );
}

export default Footer;