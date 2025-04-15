"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"

export default function AccessRestrictionPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [agreed, setAgreed] = useState(false)

  useEffect(() => {
    // Überprüfe, ob der Nutzer bereits zugestimmt hat
    const hasAgreed = localStorage.getItem("access-restriction-agreed") === "true"

    // Wenn der Nutzer noch nicht zugestimmt hat, zeige das Popup an
    if (!hasAgreed) {
      setIsOpen(true)
    }
  }, [])

  const handleAgree = () => {
    localStorage.setItem("access-restriction-agreed", "true")
    setIsOpen(false)
  }

  const handleDecline = () => {
    // Leite den Nutzer zu einer sicheren Seite weiter
    window.location.href = "https://www.google.com"
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 bg-rose-500 text-white">
          <h2 className="text-xl font-bold text-center">IMPORTANT NOTICE - ACCESS RESTRICTION</h2>
        </div>

        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4 text-sm">
            {/* English Version */}
            <p>
              This website contains information, links, images and videos with sexually explicit material (hereinafter
              referred to as 'sexually explicit material'). Do not access this website if:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                You are under the age of 18 or the legal age in your country or state to consume such content (whichever
                is higher).
              </li>
              <li>You feel in any way offended or harassed by sexually explicit material.</li>
              <li>Accessing or viewing this material is illegal in your community, state or country.</li>
            </ul>

            <p>
              By entering this website, you affirm under penalty of perjury pursuant to § 156 StGB (false affirmation in
              lieu of oath) and other applicable German laws that the following statements are true and correct:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>I have reached the legal minimum age (at least 18 years).</li>
              <li>
                The sexually explicit material I view is for my personal use only and I will not make it available to
                minors or unauthorised persons.
              </li>
              <li>I wish to view/receive sexually explicit material.</li>
              <li>
                I believe that it is my constitutionally protected right as an adult to have access to such material.
              </li>
              <li>I believe that consensual sexual activity between adults is neither offensive nor obscene.</li>
              <li>Viewing, reading and downloading sexually explicit material is not against the law.</li>
            </ul>

            <div className="mt-8 pt-8 border-t border-gray-300">
              {/* German Version */}
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

        <DialogFooter className="p-6 border-t">
          <div className="flex items-center space-x-2 mb-4 w-full">
            <Checkbox id="terms" checked={agreed} onCheckedChange={(checked) => setAgreed(checked as boolean)} />
            <Label htmlFor="terms" className="text-sm">
              <span className="block">I confirm that I am at least 18 years old and agree to the terms above.</span>
              <span className="block mt-1">
                Ich bestätige, dass ich mindestens 18 Jahre alt bin und stimme den oben genannten Bedingungen zu.
              </span>
            </Label>
          </div>

          <div className="flex justify-between w-full">
            <Button variant="outline" onClick={handleDecline}>
              Decline / Ablehnen
            </Button>
            <Button className="bg-rose-500 hover:bg-rose-600" disabled={!agreed} onClick={handleAgree}>
              I Agree / Ich stimme zu
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

