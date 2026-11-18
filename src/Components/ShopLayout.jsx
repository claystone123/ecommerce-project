
import { Outlet } from 'react-router-dom';
import ShopNav from './ShopNav';
import SearchBar from './SearchBar';

function ShopLayout() {
  return (
    <div>
      <ShopNav />

      <div className="p-4">
        <SearchBar />
      </div>

      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default ShopLayout;
