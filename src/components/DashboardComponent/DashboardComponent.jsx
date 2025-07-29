import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadProductsAction,
  searchByTitleAction,
  setSortOrderOptionAction,
} from "./DashboardComponentActions";
import { getAllProducts } from "../../core/services/productFetch";
import ProductComponentCard from "../ProductComponentCard/ProductComponentCard";
import "./../../css/DashBoard.css";
import {
  addToFavorite,
  getUserProfile,
  removeFromFavorite,
} from "../../core/services/userFetch";
import { showToast } from "../../utils/utils";
import { loadProfileAction } from "../ProfileComponent/ProfileComponentActions";
import { sort_options } from "../../utils/data";
import { origins } from "../ProductComponentLayout/ProductComponentLayoutReducer";
import { setOriginToBackProductLayoutAction } from "../ProductComponentLayout/ProductComponentLayoutActions";

const PRODUCTS_LOAD = 20;

const DashboardComponent = () => {
  const dispatch = useDispatch();
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_LOAD);

  const {
    productsList: availableProductsList,
    sortOptionOrder: sortOption,
    searchByTitle,
  } = useSelector((state) => state.dashboardComponentReducer);

  const userData = useSelector(
    (state) => state.profileComponentReducer.dataProfile
  );

  const isProductFavorite = (productId) => {
    return userData?.favorites?.includes(productId);
  };

  const handleToggleFavorite = async (productId) => {
    try {
      const alreadyFavorite = isProductFavorite(productId);

      if (alreadyFavorite) {
        await removeFromFavorite(productId);
      } else {
        await addToFavorite(productId);
      }

      const updatedProfile = await getUserProfile();
      dispatch(loadProfileAction({ dataProfile: updatedProfile }));
    } catch (error) {
      console.error(error.message);
      showToast("Error al cambiar el estado del favorito", "error");
    }
  };

  const handleSortChange = (event) => {
    dispatch(
      setSortOrderOptionAction({
        sortOptionOrder: event.target.value,
      })
    );
  };

  const handleSearchChange = (event) => {
    dispatch(
      searchByTitleAction({
        searchByTitle: event.target.value,
      })
    );
  };

  const sortProductsList = (productsList, option) => {
    const [selectedOption, direction] = option.split("_");

    const sortedProductList = [...productsList].sort((product_a, product_b) => {
      if (selectedOption === "createdAt") {
        const dateA = new Date(product_a.createdAt);
        const dateB = new Date(product_b.createdAt);
        return direction === "asc" ? dateA - dateB : dateB - dateA;
      } else {
        let valueA, valueB;
        if (selectedOption === "price") {
          valueA = product_a[selectedOption] || 0;
          valueB = product_b[selectedOption] || 0;
        } else {
          valueA = (product_a[selectedOption] || "").toLowerCase();
          valueB = (product_b[selectedOption] || "").toLowerCase();
        }
        if (valueA < valueB) return direction === "asc" ? -1 : 1;
        if (valueB < valueA) return direction === "asc" ? 1 : -1;
        return 0;
      }
    });
    return sortedProductList;
  };

  const loadAvailableProducts = async () => {
    try {
      const productsAvailables = await getAllProducts();
      const productsAvailablesNoOwner = productsAvailables.filter(
        (product) => userData._id !== product.owner
      );
      dispatch(
        loadProductsAction({
          productsList: productsAvailablesNoOwner,
        })
      );
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + PRODUCTS_LOAD);
  };

  const filteredByTitleProductsList = (availableProductsList || []).filter ((product) => product.title.toLowerCase().includes(searchByTitle.toLowerCase()))

  const sortedProductsList = sortProductsList(
    filteredByTitleProductsList,
    sortOption
  );
  const visibleProducts = sortedProductsList?.slice(0, visibleCount) || [];

  const hasMoreToShow = availableProductsList?.length > visibleCount;

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        loadAvailableProducts();
        const profile = await getUserProfile();
        dispatch(loadProfileAction({ dataProfile: profile }));
      } catch (error) {
        showToast("Error al inicilizar el componente", "error");
        console.log(error.message);
      }
    };
    loadInitialData();
    dispatch(
      setOriginToBackProductLayoutAction({
        originToBack: origins.DASHBOARD
      })
    )
  }, []);

  return (
    <>
      <div className="dashboard-sort-search-list-products">
        <div>
          <input
          className="search-bytitle-input"
            type="text"
            placeholder="Búsqueda por título..."
            value={searchByTitle}
            onChange={handleSearchChange}
          />
        </div>
        <div className="select-sort-order">
          <label className="sort-order-label">Ordenar por </label>
          <select
            id="sort-order"
            onChange={handleSortChange}
            value={sortOption}
          >
            {Object.entries(sort_options).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="dashboard-list-products-container">
        {visibleProducts.length > 0 ? (
          visibleProducts.map((product) => (
            <ProductComponentCard
              key={product._id}
              productInfo={product}
              isFavorite={isProductFavorite(product._id)}
              onToggleFavorite={handleToggleFavorite}
            />
          ))
        ) : (
          <div className="products-list-empty">
            <h1>No hay productos disponibles</h1>
          </div>
        )}
        {hasMoreToShow && (
          <div className="load-more-wrapper">
            <button onClick={loadMore}>Cargar más resultados</button>
          </div>
        )}
      </div>

      <div className="toast-message" id="toastMessage"></div>
    </>
  );
};

export default DashboardComponent;
