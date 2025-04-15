import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Nutzungsbedingungen</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Haftungsausschluss für von Nutzern hochgeladene Inhalte</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>
            Diese Website stellt eine Plattform für Nutzer bereit, um Inhalte zu teilen, die unter anderem sexuell
            explizites Material enthalten können. Der Betreiber dieser Website ist nicht der Produzent dieser Inhalte,
            sondern stellt lediglich die technische Infrastruktur zur Verfügung.
          </p>

          <p>
            Jeder Nutzer, der Inhalte hochlädt, veröffentlicht oder verbreitet, trägt die alleinige und vollständige
            Verantwortung für diese Inhalte und bestätigt ausdrücklich, dass:
          </p>

          <ul>
            <li>
              Er oder sie alle geltenden gesetzlichen Bestimmungen einhält, insbesondere den
              Jugendmedienschutz-Staatsvertrag (JMStV) und das Strafgesetzbuch (StGB).
            </li>
            <li>
              Alle abgebildeten Personen volljährig sind und ihre ausdrückliche Zustimmung zur Aufnahme und
              Veröffentlichung des Materials erteilt haben.
            </li>
            <li>Die Inhalte keine illegalen oder nicht einvernehmlichen sexuellen Handlungen enthalten.</li>
            <li>
              Der Nutzer allein für mögliche rechtliche Konsequenzen haftet, die sich aus der Veröffentlichung oder
              Verbreitung seiner Inhalte ergeben können.
            </li>
          </ul>

          <p>Der Betreiber dieser Website:</p>

          <ul>
            <li>Übernimmt keine Haftung für von Nutzern bereitgestellte Inhalte.</li>
            <li>
              Prüft oder moderiert hochgeladene Inhalte nicht aktiv, sondern reagiert ausschließlich auf berechtigte
              Beschwerden oder gesetzliche Anordnungen.
            </li>
            <li>
              Hat den Nutzern vor der Veröffentlichung ausdrücklich mitgeteilt, dass sie für die von ihnen hochgeladenen
              Inhalte selbst verantwortlich sind.
            </li>
            <li>
              Behält sich das Recht vor, Inhalte zu entfernen, wenn sie gegen geltende Gesetze oder die
              Nutzungsbedingungen verstoßen.
            </li>
          </ul>

          <p>
            Durch das Hochladen von Inhalten bestätigt jeder Nutzer, dass er die volle rechtliche Verantwortung für
            seine Inhalte übernimmt und den Betreiber der Website von jeglicher Haftung freistellt.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

