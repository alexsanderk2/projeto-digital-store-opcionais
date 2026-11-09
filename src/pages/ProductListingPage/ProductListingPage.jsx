import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../Layout/Layout';
import ProductListing from '../../components/ProductListing/ProductListing';
import FilterGroup from '../../components/FilterGroup/FilterGroup';
import { Loading, ErrorMessage } from '../../components/Status/Status';
import useFetch from '../../hooks/useFetch';
import { getProducts } from '../../services/api';
import './ProductListingPage.css';

const normalize = (text) =>
  text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

const finalPrice = (product) => product.priceDiscount ?? product.price;

const SORTERS = {
  relevantes: (a, b) => b.stars - a.stars,
  menor: (a, b) => finalPrice(a) - finalPrice(b),
  maior: (a, b) => finalPrice(b) - finalPrice(a),
};

const uniqueOptions = (products, key) =>
  [...new Set(products.map((p) => p[key]))].sort((a, b) => a.localeCompare(b)).map((text) => ({ text }));

const initialFilters = { brand: [], category: [], gender: [], state: [] };

const FilterIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 5h18l-7 8v6l-4 2v-8L3 5z" />
  </svg>
);

const ProductListingPage = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get('filter') ?? '';
  const [order, setOrder] = useState('relevantes');
  const [filters, setFilters] = useState(initialFilters);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { data: products, loading, error, retry } = useFetch(getProducts);

  useEffect(() => {
    document.body.style.overflow = filtersOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [filtersOpen]);

  const options = useMemo(() => {
    const list = products ?? [];
    return {
      brand: uniqueOptions(list, 'brand'),
      category: uniqueOptions(list, 'category'),
      gender: uniqueOptions(list, 'gender'),
      state: uniqueOptions(list, 'state'),
    };
  }, [products]);

  const toggle = (key, inputType) => (value, checked) => {
    setFilters((prev) => {
      if (inputType === 'radio') return { ...prev, [key]: [value] };
      const list = checked ? [...prev[key], value] : prev[key].filter((v) => v !== value);
      return { ...prev, [key]: list };
    });
  };

  const result = useMemo(() => {
    const term = normalize(search);
    const filtered = (products ?? []).filter((product) => {
      const haystack = normalize(`${product.name} ${product.type} ${product.brand} ${product.category}`);
      if (term && !haystack.includes(term)) return false;
      return Object.entries(filters).every(
        ([key, values]) => values.length === 0 || values.includes(product[key])
      );
    });
    return filtered.sort(SORTERS[order]);
  }, [products, search, filters, order]);

  const activeFilters = Object.values(filters).reduce((total, list) => total + list.length, 0);

  return (
    <Layout>
      <div className="container listing">
        <div className="listing__toolbar">
          <p className="listing__results">
            {search ? (
              <>
                <strong>Resultados para &quot;{search}&quot;</strong> -{' '}
              </>
            ) : (
              <strong>Todos os produtos - </strong>
            )}
            {loading ? '...' : `${result.length} produto${result.length === 1 ? '' : 's'}`}
          </p>

          <div className="listing__toolbar-actions">
            <label className="listing__order">
              <span>Ordenar por:</span>
              <select value={order} onChange={(e) => setOrder(e.target.value)}>
                <option value="relevantes">mais relevantes</option>
                <option value="menor">menor preço</option>
                <option value="maior">maior preço</option>
              </select>
            </label>
            <button
              type="button"
              className="listing__filter-button"
              onClick={() => setFiltersOpen(true)}
              aria-label="Abrir filtros"
            >
              <FilterIcon />
              {activeFilters > 0 && <span className="listing__filter-count">{activeFilters}</span>}
            </button>
          </div>
        </div>

        <div className="listing__body">
          <div
            className={`listing__overlay ${filtersOpen ? 'listing__overlay--open' : ''}`}
            onClick={() => setFiltersOpen(false)}
            aria-hidden="true"
          />
          <aside className={`listing__filters ${filtersOpen ? 'listing__filters--open' : ''}`}>
            <div className="listing__filters-header">
              <h3 className="listing__filters-title">Filtrar por</h3>
              <button
                type="button"
                className="listing__filters-close"
                onClick={() => setFiltersOpen(false)}
                aria-label="Fechar filtros"
              >
                ×
              </button>
            </div>
            <hr />
            <FilterGroup
              title="Marca"
              inputType="checkbox"
              options={options.brand}
              selected={filters.brand}
              onChange={toggle('brand', 'checkbox')}
            />
            <FilterGroup
              title="Categoria"
              inputType="checkbox"
              options={options.category}
              selected={filters.category}
              onChange={toggle('category', 'checkbox')}
            />
            <FilterGroup
              title="Gênero"
              inputType="checkbox"
              options={options.gender}
              selected={filters.gender}
              onChange={toggle('gender', 'checkbox')}
            />
            <FilterGroup
              title="Estado"
              inputType="radio"
              options={options.state}
              selected={filters.state}
              onChange={toggle('state', 'radio')}
            />
            <button type="button" className="listing__clear" onClick={() => setFilters(initialFilters)}>
              Limpar filtros
            </button>
          </aside>

          <div className="listing__content">
            {loading && <Loading text="Carregando produtos..." />}
            {error && <ErrorMessage text="Não foi possível carregar os produtos." onRetry={retry} />}
            {!loading && !error && (result.length ? (
              <ProductListing products={result} columns={3} />
            ) : (
              <p className="listing__empty">Nenhum produto encontrado.</p>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductListingPage;
