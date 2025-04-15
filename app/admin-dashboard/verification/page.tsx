"use client"

import { useState } from "react"
import AdminAuthCheck from "@/components/admin-auth-check"
import AdminLayout from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CheckCircle, XCircle, Eye, MoreHorizontal, UserCheck, UserX, AlertTriangle } from "lucide-react"

// Simulierte Benutzer mit Ausweisverifizierung
const verificationRequests = [
  {
    id: "ver1",
    userId: "user1",
    username: "julia_hot",
    email: "julia@example.com",
    submissionDate: new Date(2023, 3, 10),
    status: "pending",
    frontImage: "/placeholder.svg?height=300&width=500&text=ID+Front",
    backImage: "/placeholder.svg?height=300&width=500&text=ID+Back",
    age: null,
  },
  {
    id: "ver2",
    userId: "user2",
    username: "max_seductive",
    email: "max@example.com",
    submissionDate: new Date(2023, 3, 9),
    status: "approved",
    frontImage: "/placeholder.svg?height=300&width=500&text=ID+Front",
    backImage: "/placeholder.svg?height=300&width=500&text=ID+Back",
    age: 24,
    verificationDate: new Date(2023, 3, 10),
  },
  {
    id: "ver3",
    userId: "user3",
    username: "sexy_trans",
    email: "trans@example.com",
    submissionDate: new Date(2023, 3, 8),
    status: "rejected",
    frontImage: "/placeholder.svg?height=300&width=500&text=ID+Front",
    backImage: "/placeholder.svg?height=300&width=500&text=ID+Back",
    rejectionReason: "Ausweis nicht lesbar",
  },
  {
    id: "ver4",
    userId: "user4",
    username: "hot_couple",
    email: "couple@example.com",
    submissionDate: new Date(2023, 3, 7),
    status: "pending",
    frontImage: "/placeholder.svg?height=300&width=500&text=ID+Front",
    backImage: "/placeholder.svg?height=300&width=500&text=ID+Back",
    age: null,
  },
]

export default function AdminVerificationPage() {
  const [activeTab, setActiveTab] = useState("pending")
  const [requests, setRequests] = useState(verificationRequests)
  const [selectedRequest, setSelectedRequest] = useState<(typeof verificationRequests)[0] | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false)
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(null)
  const [rejectionReason, setRejectionReason] = useState("")

  const filteredRequests = activeTab === "all" ? requests : requests.filter((request) => request.status === activeTab)

  const handleViewRequest = (request: (typeof verificationRequests)[0]) => {
    setSelectedRequest(request)
    setIsViewDialogOpen(true)
  }

  const handleActionDialog = (request: (typeof verificationRequests)[0], action: "approve" | "reject") => {
    setSelectedRequest(request)
    setActionType(action)
    setRejectionReason("")
    setIsActionDialogOpen(true)
  }

  const handleApproveRequest = () => {
    if (!selectedRequest) return

    setRequests(
      requests.map((req) =>
        req.id === selectedRequest.id
          ? {
              ...req,
              status: "approved",
              verificationDate: new Date(),
              age: 24, // In einer echten Anwendung würde das Alter aus dem Ausweis ausgelesen
            }
          : req,
      ),
    )

    setIsActionDialogOpen(false)
  }

  const handleRejectRequest = () => {
    if (!selectedRequest || !rejectionReason) return

    setRequests(
      requests.map((req) =>
        req.id === selectedRequest.id
          ? {
              ...req,
              status: "rejected",
              rejectionReason,
            }
          : req,
      ),
    )

    setIsActionDialogOpen(false)
  }

  return (
    <AdminAuthCheck>
      <AdminLayout>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Ausweisverifizierung</h1>
              <p className="text-muted-foreground">Überprüfen und genehmigen Sie Ausweisdokumente von Streamern</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full text-sm">
                <AlertTriangle className="h-4 w-4" />
                <span>{requests.filter((req) => req.status === "pending").length} ausstehend</span>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Verifizierungsanfragen</CardTitle>
              <CardDescription>
                Überprüfen Sie die Ausweisdokumente und bestätigen Sie das Alter der Streamer
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="all">Alle</TabsTrigger>
                  <TabsTrigger value="pending">Ausstehend</TabsTrigger>
                  <TabsTrigger value="approved">Genehmigt</TabsTrigger>
                  <TabsTrigger value="rejected">Abgelehnt</TabsTrigger>
                </TabsList>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Benutzername</TableHead>
                        <TableHead>E-Mail</TableHead>
                        <TableHead>Eingereicht am</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Aktionen</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRequests.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                            Keine Anfragen gefunden
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredRequests.map((request) => (
                          <TableRow key={request.id}>
                            <TableCell className="font-medium">{request.username}</TableCell>
                            <TableCell>{request.email}</TableCell>
                            <TableCell>{request.submissionDate.toLocaleDateString("de-DE")}</TableCell>
                            <TableCell>
                              <div
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  request.status === "approved"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                    : request.status === "rejected"
                                      ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                }`}
                              >
                                {request.status === "approved"
                                  ? "Genehmigt"
                                  : request.status === "rejected"
                                    ? "Abgelehnt"
                                    : "Ausstehend"}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Aktionen</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleViewRequest(request)}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    <span>Dokumente ansehen</span>
                                  </DropdownMenuItem>
                                  {request.status === "pending" && (
                                    <>
                                      <DropdownMenuItem onClick={() => handleActionDialog(request, "approve")}>
                                        <UserCheck className="mr-2 h-4 w-4" />
                                        <span>Genehmigen</span>
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => handleActionDialog(request, "reject")}>
                                        <UserX className="mr-2 h-4 w-4" />
                                        <span>Ablehnen</span>
                                      </DropdownMenuItem>
                                    </>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </Tabs>
            </CardContent>
          </Card>

          {/* Dialog zum Anzeigen der Dokumente */}
          <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
            <DialogContent className="sm:max-w-[700px]">
              <DialogHeader>
                <DialogTitle>Ausweisdokumente von {selectedRequest?.username}</DialogTitle>
                <DialogDescription>
                  Überprüfen Sie die Ausweisdokumente und stellen Sie sicher, dass die Person mindestens 18 Jahre alt
                  ist.
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Vorderseite</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <img
                      src={selectedRequest?.frontImage || "/placeholder.svg"}
                      alt="Vorderseite des Ausweises"
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Rückseite</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <img
                      src={selectedRequest?.backImage || "/placeholder.svg"}
                      alt="Rückseite des Ausweises"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Hinweise zur Überprüfung:</h4>
                <ul className="text-sm space-y-1 list-disc pl-5">
                  <li>Stellen Sie sicher, dass die Person mindestens 18 Jahre alt ist.</li>
                  <li>Überprüfen Sie, ob der Ausweis gültig und nicht abgelaufen ist.</li>
                  <li>Achten Sie auf Anzeichen von Manipulation oder Fälschung.</li>
                  <li>Vergewissern Sie sich, dass alle wichtigen Informationen lesbar sind.</li>
                </ul>
              </div>

              <DialogFooter className="gap-2">
                {selectedRequest?.status === "pending" && (
                  <>
                    <Button variant="outline" onClick={() => handleActionDialog(selectedRequest, "reject")}>
                      <UserX className="mr-2 h-4 w-4" />
                      Ablehnen
                    </Button>
                    <Button onClick={() => handleActionDialog(selectedRequest, "approve")}>
                      <UserCheck className="mr-2 h-4 w-4" />
                      Genehmigen
                    </Button>
                  </>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Dialog zum Genehmigen oder Ablehnen */}
          <Dialog open={isActionDialogOpen} onOpenChange={setIsActionDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {actionType === "approve" ? "Verifizierung genehmigen" : "Verifizierung ablehnen"}
                </DialogTitle>
                <DialogDescription>
                  {actionType === "approve"
                    ? "Bestätigen Sie, dass der Benutzer mindestens 18 Jahre alt ist und die Ausweisdokumente gültig sind."
                    : "Geben Sie einen Grund für die Ablehnung an."}
                </DialogDescription>
              </DialogHeader>

              <div className="py-4">
                {actionType === "approve" ? (
                  <div className="flex items-center justify-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <CheckCircle className="h-8 w-8 text-green-500 mr-4" />
                    <div>
                      <h3 className="font-medium">Verifizierung genehmigen</h3>
                      <p className="text-sm text-muted-foreground">
                        Der Benutzer wird benachrichtigt und kann sofort mit dem Streaming beginnen.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <XCircle className="h-8 w-8 text-red-500 mr-4" />
                      <div>
                        <h3 className="font-medium">Verifizierung ablehnen</h3>
                        <p className="text-sm text-muted-foreground">
                          Der Benutzer wird benachrichtigt und kann neue Dokumente einreichen.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="rejection-reason" className="text-sm font-medium">
                        Ablehnungsgrund
                      </label>
                      <textarea
                        id="rejection-reason"
                        className="w-full min-h-[100px] p-2 border rounded-md"
                        placeholder="Geben Sie einen Grund für die Ablehnung an..."
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsActionDialogOpen(false)}>
                  Abbrechen
                </Button>
                {actionType === "approve" ? (
                  <Button onClick={handleApproveRequest}>Genehmigen</Button>
                ) : (
                  <Button variant="destructive" onClick={handleRejectRequest} disabled={!rejectionReason}>
                    Ablehnen
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </AdminLayout>
    </AdminAuthCheck>
  )
}

