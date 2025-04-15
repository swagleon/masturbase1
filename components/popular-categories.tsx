import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

const categories = [
  {
    id: "frauen",
    name: "Frauen",
    viewers: 245000,
    image: "/placeholder.svg?height=150&width=150&text=Frauen",
  },
  {
    id: "maenner",
    name: "Männer",
    viewers: 120000,
    image: "/placeholder.svg?height=150&width=150&text=Männer",
  },
  {
    id: "paare",
    name: "Paare",
    viewers: 180000,
    image: "/placeholder.svg?height=150&width=150&text=Paare",
  },
  {
    id: "trans",
    name: "Trans",
    viewers: 95000,
    image: "/placeholder.svg?height=150&width=150&text=Trans",
  },
]

export default function PopularCategories() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {categories.map((category) => (
        <Link href={`/category/${category.id}`} key={category.id}>
          <Card className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-square">
              <img
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-3">
              <h3 className="font-medium">{category.name}</h3>
              <p className="text-sm text-muted-foreground">
                {new Intl.NumberFormat("de-DE").format(category.viewers)} Zuschauer
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

