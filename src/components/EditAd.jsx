import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Pen } from "lucide-react";

export default function MyEditAd({ ads, fillForm }) {
  return (
    <section>
      <h2>Mening e'lonlarim</h2>
      {ads.length ? (
        <ul>
          {ads.map((ad) => (
            <li key={ad.id}>
              <Card>
                <CardHeader>
                  <CardTitle>{ad.title}</CardTitle>
                  <CardDescription>{ad.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Narx: {ad.price} so’m</p>
                  <p>Joylangan: {new Date(ad.created_at).toLocaleString()}</p>
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
