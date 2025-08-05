import { parseNavigation } from "./Parse/Parse";

const doTheThing = (html: string) => {
  const navigation = document.createRange().createContextualFragment(html);
  return parseNavigation(navigation);
}

doTheThing(`
           
<div>
  <div class="gnav-brand logo brand-image-only">
    <div>
      <div><a href="/federal/assets/svgs/adobe-logo.svg">https://main--federal--adobecom.hlx.page/federal/assets/svgs/adobe-logo.svg|Adobe, Inc.</a> <a href="https://www.adobe.com/">Adobe</a></div>
    </div>
  </div>
</div>
<div>
  <div class="large-menu section">
    <div>
      <div>
        <h2 id="pdf--e-signatures"><a href="/federal/globalnav/acom/sections/section-menu-dc">PDF &#x26; E-signatures</a></h2>
      </div>
    </div>
  </div>
</div>
<div>
  <h2 id="acrobat-for-business"><a href="https://www.adobe.com/acrobat/business.html">Acrobat for business</a></h2>
</div>
<div>
  <h2 id="products"><a href="https://www.adobe.com/acrobat.html">Products</a></h2>
  <h5 id="products-1"><strong>Products</strong></h5>
  <ul>
    <li><a href="https://www.adobe.com/acrobat/business/acrobat-pro.html">Acrobat for teams</a></li>
    <li><a href="https://www.adobe.com/acrobat/business/enterprise.html">Acrobat for enterprise</a></li>
    <li><a href="https://www.adobe.com/sign.html">Acrobat Sign Solutions</a></li>
  </ul>
  <h5 id="explore-features"><strong>Explore features</strong></h5>
  <ul>
    <li><a href="https://www.adobe.com/documentcloud/integrations.html">Integrations</a></li>
    <li><a href="https://www.adobe.com/sign/features/branding.html">Branding</a></li>
    <li><a href="https://www.adobe.com/sign/features/mega-sign.html">Send in bulk</a></li>
    <li><a href="https://www.adobe.com/sign/features/payment-gateway-integrations.html">Collect payments</a></li>
  </ul>
</div>
<div>
  <h2 id="solutions"><a href="https://www.adobe.com/acrobat/pricing/compare-versions.html">Solutions</a></h2>
  <h5 id="departments"><strong>Departments</strong></h5>
  <ul>
    <li><a href="https://www.adobe.com/documentcloud/departments/sales.html">Sales</a></li>
    <li><a href="https://www.adobe.com/documentcloud/departments/human-resources.html">HR</a></li>
    <li><a href="https://www.adobe.com/sign/compliance/electronic-signature-legality.html">Legal</a></li>
    <li><a href="https://www.adobe.com/documentcloud/departments/it.html">IT</a></li>
  </ul>
  <div class="link-group blue">
    <div>
      <div><a href="https://www.adobe.com/documentcloud/departments.html">View all</a></div>
    </div>
  </div>
  <h5 id="industries"><strong>Industries</strong></h5>
  <ul>
    <li><a href="https://www.adobe.com/documentcloud/industries/financial-services.html">Financial services</a></li>
    <li><a href="https://www.adobe.com/documentcloud/industries/insurance.html">Insurance</a></li>
    <li><a href="https://www.adobe.com/documentcloud/industries/life-sciences.html">Life sciences</a></li>
    <li><a href="https://www.adobe.com/documentcloud/industries/government.html">Government</a></li>
  </ul>
  <div class="link-group blue">
    <div>
      <div><a href="https://www.adobe.com/documentcloud/industries.html">View all</a></div>
    </div>
  </div>
</div>
<div>
  <h2 id="resources"><a href="https://www.adobe.com/acrobat/resources.html">Resources</a></h2>
  <h5 id="learn"><strong>Learn</strong></h5>
  <ul>
    <li><a href="https://business.adobe.com/customer-success-stories.html?Search=Document+Cloud#_blank">Customer stories</a></li>
    <li><a href="https://www.adobe.com/sign/esignature-resources.html">E-sign tutorials</a></li>
    <li><a href="https://www.adobe.com/documentcloud/whitepapers.html">Reports</a></li>
    <li><a href="https://www.adobe.com/documentcloud/webinars.html">Webinars</a></li>
  </ul>
  <h5 id="support"><strong>Support</strong></h5>
  <ul>
    <li><a href="https://www.adobe.com/trust/security.html">Security and compliance</a></li>
    <li><a href="https://www.adobe.com/trust/document-cloud-security.html">Trust Center</a></li>
    <li><a href="https://www.adobe.com/documentcloud/resources/it-tools.html">Developer resources</a></li>
    <li><a href="https://helpx.adobe.com/support/sign.html">Help Center</a></li>
  </ul>
</div>
<div>
  <h2 id="for-admins"><a href="https://adminconsole.adobe.com/?trackingid=91BF4Z77&#x26;mv=in-product">For admins</a></h2>
</div>
<div>
  <h2 id="contact-sales">Contact Sales</h2>
  <ul>
    <li><a href="https://www.adobe.com/acrobat/contact.html">Request information</a></li>
    <li><a href="https://www.adobe.com/acrobat/features.html#open-jarvis-chat">Chat with Sales</a></li>
    <li><a href="tel:800-915-9459">Call 800-915-9459</a></li>
  </ul>
</div>
<div>
  <h2 id="free-trial"><a href="/acrobat/business/pricing/plans?tab=plantype-2">Free trial</a></h2>
</div>
<div>
  <p><strong><a href="/acrobat/business/pricing/plans?tab=plantype-2">Buy now</a></strong></p>
</div>
<div>
  <h2 id="915-9459"><a href="tel:800-915-9459">800-915-9459</a></h2>
</div>
<div>
  <div class="profile">
    <div>
      <div></div>
    </div>
  </div>
</div>
           `)
