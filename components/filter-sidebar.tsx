import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

// Filter categories
const regions = [
  { id: "north-america", label: "Nordamerika" },
  { id: "south-america", label: "Südamerika" },
  { id: "asia", label: "Asien" },
  { id: "europe", label: "Europa" },
  { id: "russia", label: "Russland" },
  { id: "other", label: "Andere" },
]

const languages = [
  { id: "english", label: "Englisch" },
  { id: "espanol", label: "Español (Spanisch)" },
  { id: "french", label: "French" },
  { id: "italian", label: "Italian" },
  { id: "deutsch", label: "Deutsch" },
]

const tags = [
  // Existing tags
  "Brown",
  "Blond",
  "Squirt",
  "Dildo",
  "Just Fingers",
  "Lovesense",
  "Vibrator",
  "Strip",
  // New tags
  "18",
  "teen",
  "latina",
  "asian",
  "ebony",
  "german",
  "new",
  "bigboobs",
  "feet",
  "fuckmachine",
  "cum",
  "dirtytalk",
  "love",
  "milf",
  "skinny",
  "deepthroat",
  "muscle",
  "bigcook",
  "french",
  "femboy",
  "redhead",
  "lesbian",
  "bigpussylips",
  "blonde",
  "natural",
  "bdsm",
  "twink",
  "smallcock",
  "bigtits",
  "latex",
  "bigclit",
  "gay",
  "couple",
  "latino",
  "blowjob",
  "trans",
  "italian",
  "uncut",
  "cut",
  "slut",
  "japanese",
]

export default function FilterSidebar() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Filter</CardTitle>
        <div className="relative mt-2">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Suche nach Tags..." className="pl-8" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4 overflow-auto max-h-[calc(100vh-12rem)]">
        <Accordion type="multiple" defaultValue={["regions", "languages", "tags"]}>
          <AccordionItem value="regions">
            <AccordionTrigger className="text-sm font-medium">Regionen</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 mt-2">
                {regions.map((region) => (
                  <div key={region.id} className="flex items-center space-x-2">
                    <Checkbox id={`region-${region.id}`} />
                    <Label htmlFor={`region-${region.id}`} className="text-sm font-normal cursor-pointer">
                      {region.label}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="languages">
            <AccordionTrigger className="text-sm font-medium">Sprachen</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 mt-2">
                {languages.map((language) => (
                  <div key={language.id} className="flex items-center space-x-2">
                    <Checkbox id={`language-${language.id}`} />
                    <Label htmlFor={`language-${language.id}`} className="text-sm font-normal cursor-pointer">
                      {language.label}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="tags" className="border-b">
            <AccordionTrigger className="text-sm font-medium">Tags</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <div key={tag} className="flex items-center">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs hover:bg-rose-500/10 hover:text-rose-500 hover:border-rose-500/20"
                    >
                      {tag}
                    </Button>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="pt-2">
          <Button className="w-full bg-rose-500 hover:bg-rose-600">Filter anwenden</Button>
        </div>
      </CardContent>
    </Card>
  )
}

