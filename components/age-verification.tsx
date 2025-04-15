"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function AgeVerification() {
  const [isOpen, setIsOpen] = useState(true)
  const [agreed, setAgreed] = useState(false)

  useEffect(() => {
    // Check if user has already agreed
    const hasAgreed = localStorage.getItem("age-verified") === "true"
    if (hasAgreed) {
      setIsOpen(false)
    }
  }, [])

  const handleAgree = () => {
    localStorage.setItem("age-verified", "true")
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="bg-background max-w-3xl rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 bg-rose-500 text-white">
          <h2 className="text-xl font-bold text-center">
            YOU MUST BE OVER 18 AND AGREE TO THE TERMS BELOW BEFORE CONTINUING:
          </h2>
        </div>

        <ScrollArea className="h-[60vh] max-h-[500px] p-6">
          <div className="space-y-4 text-sm">
            {/* English Version First */}
            <h3 className="font-bold text-lg mb-2">Important Notice – Access Restriction</h3>

            <p>
              This website contains information, links, images and videos of sexually explicit material (collectively,
              the "Sexually Explicit Material"). Do NOT continue if:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                You are not at least 18 years of age or the age of majority in each and every jurisdiction in which you
                will or may view the Sexually Explicit Material, whichever is higher (the "Age of Majority")
              </li>
              <li>Such material offends you</li>
              <li>
                Viewing the Sexually Explicit Material is not legal in each and every community where you choose to view
                it
              </li>
            </ul>

            <p>
              By choosing to enter this website you are affirming under oath and penalties of perjury pursuant to Title
              28 U.S.C. § 1746 and other applicable statutes and laws that all of the following statements are true and
              correct:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>I have attained the Age of Majority in my jurisdiction;</li>
              <li>
                The sexually explicit material I am viewing is for my own personal use and I will not expose any minors
                to the material;
              </li>
              <li>I desire to receive/view sexually explicit material;</li>
              <li>
                I believe that as an adult it is my inalienable constitutional right to receive/view sexually explicit
                material;
              </li>
              <li>I believe that sexual acts between consenting adults are neither offensive nor obscene;</li>
              <li>
                The viewing, reading and downloading of sexually explicit materials does not violate the standards of
                any community, town, city, state or country where I will be viewing, reading and/or downloading the
                Sexually Explicit Materials;
              </li>
              <li>
                I am solely responsible for any false disclosures or legal ramifications of viewing, reading or
                downloading any material appearing on this site. I further agree that neither this website nor its
                affiliates will be held responsible for any legal ramifications arising from any fraudulent entry into
                or use of this website;
              </li>
              <li>
                I understand that this website uses cookies, web beacons, tracking pixels, and similar tracking
                technologies, as more fully described in the website's Privacy Policy, and I hereby consent to the use
                of such tracking technologies;
              </li>
              <li>
                I understand that my use of this website is governed by the website's Terms which I have reviewed and
                accepted, and I agree to be bound by such Terms.
              </li>
              <li>
                I agree that by entering this website, I am subjecting myself, and any business entity in which I have
                any legal or equitable interest, to the personal jurisdiction of the State of California, Los Angeles
                County, should any dispute arise at any time between this website, myself and/or such business entity;
              </li>
              <li>
                This warning page constitutes a legally binding agreement between me, this website and/or any business
                in which I have any legal or equitable interest. If any provision of this Agreement is found to be
                unenforceable, the remainder shall be enforced as fully as possible and the unenforceable provision
                shall be deemed modified to the limited extent required to permit its enforcement in a manner most
                closely representing the intentions as expressed herein;
              </li>
              <li>
                All performers on this site are over the age of 18, have consented being photographed and/or filmed,
                believe it is their right to engage in consensual sexual acts for the entertainment and education of
                other adults and I believe it is my right as an adult to watch them doing what adults do;
              </li>
              <li>
                The videos and images in this site are intended to be used by responsible adults as sexual aids, to
                provide sexual education and to provide sexual entertainment;
              </li>
              <li>
                I understand that providing a false declaration under the penalties of perjury is a criminal offense;
                and
              </li>
              <li>
                I agree that this agreement is governed by the Electronic Signatures in Global and National Commerce Act
                (commonly known as the "E-Sign Act"), 15 U.S.C. § 7000, et seq., and by choosing to click on "I Agree"
                and indicating my agreement to be bound by the terms of this agreement, I affirmatively adopt the
                signature line below as my signature and the manifestation of my consent to be bound by the terms of
                this agreement.
              </li>
            </ul>

            <p className="font-semibold mt-4">Signed: /s/</p>

            <div className="mt-8 pt-8 border-t border-gray-300">
              {/* German Version Second */}
              <h3 className="font-bold text-lg mb-2">Wichtiger Hinweis – Zugangsbeschränkung</h3>

              <p>
                Diese Website enthält Informationen, Links, Bilder und Videos mit sexuell explizitem Material (im
                Folgenden „sexuell explizites Material"). Betreten Sie diese Website nicht, falls:
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Sie noch nicht mindestens 18 Jahre alt sind oder in Ihrem Land bzw. Bundesland nicht das gesetzliche
                  Mindestalter für den Konsum derartiger Inhalte erreicht haben (je nachdem, welches höher ist).
                </li>
                <li>
                  Sie sich durch sexuell explizites Material in irgendeiner Weise beleidigt oder belästigt fühlen.
                </li>
                <li>
                  Der Zugriff auf oder das Betrachten dieses Materials in Ihrer Gemeinde, Ihrem Bundesland oder Land
                  illegal ist.
                </li>
              </ul>

              <p>
                Mit dem Betreten dieser Website versichern Sie unter Eid und unter Strafandrohung gemäß § 156 StGB
                (falsche Versicherung an Eides statt) und anderen anwendbaren deutschen Gesetzen, dass die folgenden
                Aussagen wahr und korrekt sind:
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li>Ich habe das gesetzliche Mindestalter (mindestens 18 Jahre) erreicht.</li>
                <li>
                  Das sexuell explizite Material, das ich sehe, ist ausschließlich für meinen persönlichen Gebrauch, und
                  ich werde es nicht Minderjährigen oder unbefugten Personen zugänglich machen.
                </li>
                <li>Ich möchte sexuell explizites Material sehen/erhalten.</li>
                <li>
                  Ich glaube, dass es mein grundrechtlich geschütztes Recht als Erwachsener ist, Zugang zu solchem
                  Material zu haben.
                </li>
                <li>
                  Ich bin der Meinung, dass einvernehmliche sexuelle Handlungen zwischen Erwachsenen weder anstößig noch
                  obszön sind.
                </li>
                <li>
                  Das Ansehen, Lesen und Herunterladen sexuell expliziten Materials verstößt nicht gegen die geltenden
                  Gesetze oder moralischen Standards in meinem Wohnort.
                </li>
                <li>
                  Ich übernehme die volle Verantwortung für falsche Angaben oder mögliche rechtliche Konsequenzen, die
                  sich aus der Nutzung dieser Website ergeben können. Ich stimme zu, dass weder diese Website noch ihre
                  Betreiber für Verstöße meinerseits haftbar gemacht werden können.
                </li>
                <li>
                  Ich verstehe, dass diese Website Cookies, Web-Beacons, Tracking-Pixel und ähnliche Technologien
                  verwendet, wie in der Datenschutzerklärung näher beschrieben. Ich stimme der Verwendung dieser
                  Technologien ausdrücklich zu.
                </li>
                <li>
                  Ich habe die Nutzungsbedingungen der Website gelesen, verstanden und akzeptiert und erkläre mich
                  einverstanden, an diese gebunden zu sein.
                </li>
                <li>
                  Ich stimme zu, dass für eventuelle Streitigkeiten zwischen mir und dieser Website ausschließlich das
                  deutsche Recht gilt und dass der Gerichtsstand am Sitz des Betreibers der Website liegt.
                </li>
                <li>
                  Diese Hinweisseite stellt eine rechtlich bindende Vereinbarung zwischen mir und dieser Website dar.
                  Sollte eine Bestimmung dieser Vereinbarung als unwirksam angesehen werden, bleibt der restliche Teil
                  der Vereinbarung so weit wie möglich in Kraft.
                </li>
                <li>
                  Alle auf dieser Website abgebildeten Darstellerinnen und Darsteller sind über 18 Jahre alt und haben
                  ihrer Aufnahme und Veröffentlichung ausdrücklich zugestimmt. Sie betrachten es als ihr Recht,
                  einvernehmlich sexuelle Handlungen auszuführen, um andere Erwachsene zu unterhalten oder zu
                  informieren. Ich betrachte es als mein Recht, ihnen dabei zuzusehen.
                </li>
                <li>
                  Die hier gezeigten Videos und Bilder dienen der sexuellen Unterhaltung und Aufklärung
                  verantwortungsbewusster Erwachsener.
                </li>
                <li>
                  Ich verstehe, dass die Angabe falscher Informationen unter den Strafgesetzen der Bundesrepublik
                  Deutschland strafbar ist (§ 156 StGB – falsche Versicherung an Eides statt).
                </li>
                <li>
                  Ich stimme zu, dass diese Vereinbarung unter das Gesetz über elektronische Signaturen (SigG) fällt,
                  und dass meine Zustimmung durch das Anklicken von „Ich stimme zu" als meine elektronische Unterschrift
                  gilt.
                </li>
              </ul>

              <p className="font-semibold mt-4">Unterschrift: /s/</p>
            </div>
          </div>
        </ScrollArea>

        <div className="p-6 border-t">
          <div className="flex items-center space-x-2 mb-4">
            {/* English checkbox first */}
            <Checkbox id="terms" checked={agreed} onCheckedChange={(checked) => setAgreed(checked as boolean)} />
            <Label htmlFor="terms" className="text-sm">
              I confirm that I am at least 18 years old and agree to the terms stated above.
            </Label>
          </div>

          {/* German checkbox second */}
          <div className="flex items-center space-x-2 mb-4">
            <Checkbox id="terms-de" checked={agreed} onCheckedChange={(checked) => setAgreed(checked as boolean)} />
            <Label htmlFor="terms-de" className="text-sm">
              Ich bestätige, dass ich mindestens 18 Jahre alt bin und stimme den oben genannten Bedingungen zu.
            </Label>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => (window.location.href = "https://www.google.com")}>
              Verlassen
            </Button>
            <Button className="bg-rose-500 hover:bg-rose-600" disabled={!agreed} onClick={handleAgree}>
              I Agree - Enter / Ich stimme zu - Eintreten
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

