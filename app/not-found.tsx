import Error from "@/app/components/Error";

export default function NotFound() {
  return (
    <>
      <Error errorType="wrongPage" siteType="normal" redirectLink={true} />
    </>
  );
}
