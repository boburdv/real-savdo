import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function Statistic() {
  return (
    <div className="max-w-6xl mx-auto p-2.5">
      <h2 className="text-2xl mb-6 font-semibold">Statistika</h2>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent>
            <div>
              <h3>sa</h3>
              <p>sa</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div>
              <h3>sa</h3>
              <p>sa</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
