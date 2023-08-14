import Content from "@/components/Content";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/model/Product";



export default function HomePage({featuredProduct,newProducts}) {
  return (
    <div>
      <Header />
      <Content product={featuredProduct} />
      <NewProducts products={newProducts} />
    </div>
  )
}

export async function getServerSideProps(){
  const featuredProductId = '64d0cbffcafe84f6622831fa';
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {sort: {'_id':-1}, limit:10});
  return{
    props: {featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  }
}