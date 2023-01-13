import useSWR from "swr";
import { useRouter } from "next/router";
import { StyledButton } from "../Button/Button.styled";
import { ProductCard } from "./Product.styled";
import Comments from "../Comments";
import { useState } from "react";

export default function Product() {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const { data } = useSWR(id ? `/api/products/${id}` : null);

  if (!data) {
    return <h1>Loading...</h1>;
  }
  function handleDelete() {
    try {
      const response = fetch(`/api/products/${id}`, { method: "DELETE" });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ProductCard>
      <h2>{data.name}</h2>
      <p>Description: {data.description}</p>
      <p>
        Price: {data.price} {data.currency}
      </p>
      {data.reviews.length > 0 && <Comments reviews={data.reviews} />}
      <StyledButton type="button" onClick={() => router.push("/")}>
        Back to all
      </StyledButton>
      <StyledButton
        type="button"
        onClick={() => {
          handleDelete();
          router.push("/");
        }}
      >
        x
      </StyledButton>
    </ProductCard>
  );
}
