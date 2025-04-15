import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DatenschutzPage() {
  const currentDate = new Date().toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" })

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Datenschutzerklärung</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Datenschutzerklärung für Masturbase.com</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p className="text-sm text-muted-foreground mb-4">Gültig ab: {currentDate}</p>

          <h3>1. Einleitung</h3>
          <p>
            Willkommen bei Masturbase.com. Der Schutz Ihrer personenbezogenen Daten ist uns ein wichtiges Anliegen. In
            dieser Datenschutzerklärung informieren wir Sie darüber, welche Daten wir erheben, wie wir sie verwenden und
            welche Rechte Sie in Bezug auf Ihre Daten haben.
          </p>

          <h3>2. Verantwortlicher</h3>
          <p>
            Firma: Masturbase
            <br />
            Unternehmer: André Kindt
            <br />
            Adresse: Elli-Voigt-Str. 9, 10367 Berlin
            <br />
            E-Mail: support@masturbase.com
          </p>

          <h3>3. Erhobene Daten</h3>
          <p>Wir erfassen und verarbeiten folgende personenbezogene Daten:</p>
          <ul>
            <li>Registrierungsdaten: Benutzername, E-Mail-Adresse, Passwort</li>
            <li>Profildaten: Hochgeladene Inhalte, Interessen, Vorlieben</li>
            <li>Zahlungsdaten: Zahlungsinformationen, soweit erforderlich</li>
            <li>Nutzungsdaten: IP-Adresse, Browsertyp, besuchte Seiten, Interaktionen auf der Plattform</li>
            <li>Kommunikationsdaten: Nachrichten, Support-Anfragen</li>
          </ul>

          <h3>4. Zweck der Datenverarbeitung</h3>
          <p>Wir verarbeiten Ihre Daten zur Bereitstellung und Verbesserung unserer Plattform, insbesondere zur:</p>
          <ul>
            <li>Ermöglichung der Nutzung von Masturbase.com</li>
            <li>Verwaltung von Benutzerkonten</li>
            <li>Verbesserung der Nutzererfahrung</li>
            <li>Abwicklung von Transaktionen</li>
            <li>Einhaltung gesetzlicher Vorschriften</li>
            <li>Durchsetzung unserer Nutzungsbedingungen</li>
          </ul>

          <h3>5. Rechtsgrundlage</h3>
          <p>Die Verarbeitung Ihrer Daten erfolgt auf Basis der DSGVO, insbesondere:</p>
          <ul>
            <li>Art. 6 Abs. 1 lit. b DSGVO (Erfüllung eines Vertrags)</li>
            <li>
              Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Sicherheit und Verbesserung der Plattform)
            </li>
            <li>Art. 6 Abs. 1 lit. c DSGVO (gesetzliche Verpflichtung)</li>
          </ul>

          <h3>6. Speicherung und Löschung von Daten</h3>
          <p>
            Ihre personenbezogenen Daten werden so lange gespeichert, wie es für die Erfüllung der genannten Zwecke
            erforderlich ist. Nach Ablauf der gesetzlichen Aufbewahrungspflichten werden Ihre Daten gelöscht.
          </p>

          <h3>7. Weitergabe von Daten</h3>
          <p>Ihre Daten werden nur weitergegeben, wenn dies erforderlich ist, insbesondere an:</p>
          <ul>
            <li>Zahlungsdienstleister</li>
            <li>IT-Dienstleister</li>
            <li>Strafverfolgungsbehörden bei rechtlichen Verpflichtungen</li>
          </ul>

          <h3>8. Internationale Datenübermittlung</h3>
          <p>
            Falls eine Übermittlung in Drittstaaten erfolgt, stellen wir sicher, dass angemessene Schutzmaßnahmen
            getroffen werden (z. B. EU-Standardvertragsklauseln).
          </p>

          <h3>9. Ihre Rechte</h3>
          <p>Sie haben folgende Rechte gemäß DSGVO:</p>
          <ul>
            <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
            <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
            <li>Recht auf Löschung (Art. 17 DSGVO)</li>
            <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
            <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
            <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
          </ul>

          <h3>10. Kontakt für Datenschutzanfragen</h3>
          <p>
            Falls Sie Fragen zum Datenschutz haben oder Ihre Rechte ausüben möchten, kontaktieren Sie uns bitte unter:
            support@masturbase.com
          </p>

          <hr className="my-8" />

          <h2 className="text-xl font-bold mb-4">Privacy Policy for Masturbase.com</h2>
          <p className="text-sm text-muted-foreground mb-4">Effective Date: {currentDate}</p>

          <h3>1. Introduction</h3>
          <p>
            Welcome to Masturbase.com. Protecting your personal data is of utmost importance to us. This Privacy Policy
            explains what data we collect, how we use it, and what rights you have regarding your data.
          </p>

          <h3>2. Data Controller</h3>
          <p>
            Company: Masturbase
            <br />
            Owner: André Kindt
            <br />
            Address: Elli-Voigt-Str. 9, 10367 Berlin
            <br />
            Email: support@masturbase.com
          </p>

          <h3>3. Collected Data</h3>
          <p>We collect and process the following personal data:</p>
          <ul>
            <li>Registration Data: Username, email address, password</li>
            <li>Profile Data: Uploaded content, interests, preferences</li>
            <li>Payment Data: Payment details where applicable</li>
            <li>Usage Data: IP address, browser type, visited pages, interactions on the platform</li>
            <li>Communication Data: Messages, support inquiries</li>
          </ul>

          <h3>4. Purpose of Data Processing</h3>
          <p>We process your data to provide and improve our platform, including:</p>
          <ul>
            <li>Enabling the use of Masturbase.com</li>
            <li>Managing user accounts</li>
            <li>Enhancing user experience</li>
            <li>Processing transactions</li>
            <li>Complying with legal requirements</li>
            <li>Enforcing our Terms & Conditions</li>
          </ul>

          <h3>5. Legal Basis</h3>
          <p>Your data is processed based on GDPR, particularly:</p>
          <ul>
            <li>Art. 6(1)(b) GDPR (performance of a contract)</li>
            <li>Art. 6(1)(f) GDPR (legitimate interest in security and platform improvement)</li>
            <li>Art. 6(1)(c) GDPR (legal obligation)</li>
          </ul>

          <h3>6. Data Retention and Deletion</h3>
          <p>
            Your personal data is stored as long as necessary for the stated purposes. After statutory retention periods
            expire, your data will be deleted.
          </p>

          <h3>7. Data Sharing</h3>
          <p>Your data may be shared where necessary, particularly with:</p>
          <ul>
            <li>Payment service providers</li>
            <li>IT service providers</li>
            <li>Law enforcement agencies where legally required</li>
          </ul>

          <h3>8. International Data Transfers</h3>
          <p>
            If data is transferred to third countries, we ensure appropriate safeguards are in place (e.g., EU Standard
            Contractual Clauses).
          </p>

          <h3>9. Your Rights</h3>
          <p>Under GDPR, you have the following rights:</p>
          <ul>
            <li>Right to access (Art. 15 GDPR)</li>
            <li>Right to rectification (Art. 16 GDPR)</li>
            <li>Right to erasure (Art. 17 GDPR)</li>
            <li>Right to restriction of processing (Art. 18 GDPR)</li>
            <li>Right to data portability (Art. 20 GDPR)</li>
            <li>Right to object (Art. 21 GDPR)</li>
          </ul>

          <h3>10. Contact for Data Protection Inquiries</h3>
          <p>
            If you have any questions about data protection or wish to exercise your rights, please contact us at:
            support@masturbase.com
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

