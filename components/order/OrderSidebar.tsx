import { PrismaClient, Category } from '@prisma/client';
import CategoryIcon from '../iu/CategoryIcon';
import Logo from '../iu/Logo';
 
const prismaClient = new PrismaClient();
 
async function getCategories() {
  const categories = await prismaClient.category.findMany();
  return categories;
}
 
export default async function OrderSidebar() {
  const categories = await getCategories();
  return (
    <aside className="md:w-72 md:h-screen bg-white ">
      <Logo/>
      <nav className="mt-10">
        {categories.map((category) => (
          <CategoryIcon key={category.id} category={category} />
        ))}
      </nav>
    </aside>
  );
}