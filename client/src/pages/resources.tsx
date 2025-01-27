import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, Map, Hospital } from "lucide-react";

export default function Resources() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Resources</h1>
      </div>

      <Tabs defaultValue="prevention">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="prevention">Prevention</TabsTrigger>
          <TabsTrigger value="testing">Testing</TabsTrigger>
          <TabsTrigger value="treatment">Treatment</TabsTrigger>
        </TabsList>

        <TabsContent value="prevention">
          <Card>
            <CardHeader>
              <CardTitle>Safe Practices Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] w-full">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <BookOpen className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold">Understanding Protection</h3>
                      <p className="text-sm text-muted-foreground">
                        Learn about different methods of protection and their effectiveness.
                      </p>
                    </div>
                  </div>
                  {/* Add more prevention content */}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testing">
          <Card>
            <CardHeader>
              <CardTitle>Testing Locations</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] w-full">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <Map className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold">Find Testing Centers</h3>
                      <p className="text-sm text-muted-foreground">
                        Locate nearby testing facilities and clinics.
                      </p>
                    </div>
                  </div>
                  {/* Add more testing locations */}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="treatment">
          <Card>
            <CardHeader>
              <CardTitle>Treatment Options</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] w-full">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <Hospital className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold">Treatment Resources</h3>
                      <p className="text-sm text-muted-foreground">
                        Information about available treatments and healthcare providers.
                      </p>
                    </div>
                  </div>
                  {/* Add more treatment content */}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
