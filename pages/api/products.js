import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/model/Product";

export default async function handle(req, res) {
  await mongooseConnect();
  const { categories, sort, searchValue, ...filters } = req.query;
  let [sortField, sortOrder] = (sort || '_id-desc').split("-");
  const productsQuery = {};
  if (categories ) {
    productsQuery.category = categories.split(",");
  }
  if(searchValue) {
    productsQuery['$or'] = [
      {title:{$regex:searchValue, $options:'i'}},
      {description:{$regex:searchValue, $options:'i'}},
    ] ;
  }
  if (Object.keys(filters).length > 0) {
    Object.keys(filters).forEach((filterName) => {
      productsQuery["properties." + filterName] = filters[filterName];
    });
  }
  console.log(productsQuery);
  res.json(await Product.find(
    productsQuery,
    null,
    {
      sort:{[sortField]:sortOrder==='asc' ? 1 : -1}
    })
  );
}
