import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Pen } from "lucide-react";

export default function MyEditAd({ ads, fillForm }) {
  return (
    <section>
      <h2 className="text-2xl mb-4">Mening e'lonlarim</h2>
      {ads.length ? (
        <ul className="flex flex-col gap-4">
          {ads.map((ad) => (
            <li key={ad.id}>
              <Card>
                <CardHeader>
                  <CardTitle>{ad.title}</CardTitle>
                  <CardDescription>{ad.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-bold">Narx: {ad.price} so’m</p>
                  <p className="text-sm text-gray-600">Joylangan: {new Date(ad.created_at).toLocaleString()}</p>
                </CardContent>
                <CardFooter>
                  <button onClick={() => fillForm(ad)}>
                    <Pen />
                  </button>
                </CardFooter>
              </Card>
            </li>
          ))}
        </ul>
      ) : (
        <p>Sizda hozircha e'lonlar yo'q.</p>
      )}
    </section>
  );
}
