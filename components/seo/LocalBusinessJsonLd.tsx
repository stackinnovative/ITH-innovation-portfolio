import { company, hero, serviceLongTitles, services } from "@/content/site";
import { isPlaceholder } from "@/lib/links";
import { siteUrl } from "@/lib/site-url";

/** Leave out anything still "[PLACEHOLDER]" — search engines must not see invented or bracketed values. */
function known(value: string) {
  return isPlaceholder(value) ? undefined : value;
}

export function LocalBusinessJsonLd() {
  const address = known(company.address);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#business`,
    name: company.name,
    alternateName: company.shortName,
    description: hero.body,
    url: siteUrl,
    image: `${siteUrl}/opengraph-image`,
    logo: `${siteUrl}/icon`,
    telephone: known(company.phone),
    email: known(company.email),
    address: address ? { "@type": "PostalAddress", streetAddress: address, addressCountry: "IN" } : undefined,
    areaServed: { "@type": "Country", name: "India" },
    makesOffer: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: serviceLongTitles[s.slug],
        description: s.summary,
        url: `${siteUrl}/services/${s.slug}`,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify drops undefined fields; escape "<" so content can't close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
