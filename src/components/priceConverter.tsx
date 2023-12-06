export default function PriceConverter(price: number) {
  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
  return (
    <div>
      <span className="badge badge-neutral  ">{USDollar} </span>
    </div>
  );
}
