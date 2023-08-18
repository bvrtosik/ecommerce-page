import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductBox from "@/components/ProductBox";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import Link from "next/link";
import { styled } from "styled-components";

const Title = styled.h1`
  font-size: 2em;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const CategoryWrapper = styled.div`
  margin-bottom: 20px;
`;

const CategoriesTitle = styled.div`
  display: flex;
  margin-top: 0;
  margin-bottom: 0;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  align-items: center;
  gap: 15px;
  a {
    color: #555;
    letter-spacing: 0;
  }
  h2 {
    margin-bottom: 15px;
    margin-top: 15px;
  }
`;

const ShowALl = styled(Link)`
  background-color: lightgray;
  height: 150px;
  border-radius: 15px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #555;
  text-decoration: none;
`;

export default function CategoriesPage({ mainCategories, categoriesProducts }) {
  return (
    <>
      <Header />
      <Center>
        <Title>Kategorie</Title>
        {mainCategories.map((cat) => (
          <CategoryWrapper>
            <CategoriesTitle>
              <h2>{cat.name}</h2>
              <div>
                <Link href={"/category/" + cat._id}>Pokaż więcej</Link>
              </div>
            </CategoriesTitle>

            <CategoryGrid>
              {categoriesProducts[cat._id].map((p) => (
                <ProductBox key={p._id} {...p} />
              ))}
              <ShowALl href={"/category/" + cat._id}>Pokaż wszystkie</ShowALl>
            </CategoryGrid>
          </CategoryWrapper>
        ))}
      </Center>
    </>
  );
}

export async function getServerSideProps() {
  const categories = await Category.find();
  const mainCategories = categories.filter((c) => !c.parentCategory);
  const categoriesProducts = {};
  for (const mainCat of mainCategories) {
    const mainCatId = mainCat._id.toString();
    const childCatIds = categories
      .filter((c) => c?.parentCategory?.toString() === mainCatId)
      .map((c) => c._id.toString());
    const categoriesIds = [mainCatId, ...childCatIds];
    const products = await Product.find({ category: categoriesIds }, null, {
      limit: 3,
      sort: { _id: -1 },
    });
    categoriesProducts[mainCat._id] = products;
  }
  return {
    props: {
      mainCategories: JSON.parse(JSON.stringify(mainCategories)),
      categoriesProducts: JSON.parse(JSON.stringify(categoriesProducts)),
    },
  };
}
