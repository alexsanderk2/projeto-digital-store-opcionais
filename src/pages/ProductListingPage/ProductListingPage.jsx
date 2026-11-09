import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Section from '../../components/Section/Section';
import ProductListing from '../../components/ProductListing/ProductListing';
import FilterGroup from '../../components/FilterGroup/FilterGroup';
import { Loading, ErrorMessage } from '../../components/Status/Status';
import useFetch from '../../hooks/useFetch';
import { getProducts } from '../../services/api';
import './ProductListingPage.css';

const normalize = (text) =>
  text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

const finalPrice = (product) => product.priceDiscount ?? product.price;

const uniqueOptions = (products, key) =>
  [...new Set(products.map((p) => p[key]))].sort((a, b) => a.localeCompare(b)).map((text) => ({ text }));

const initialFilters = { brand: [], category: [], gender: [], availability: [] };

const ProductListingPage = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get('filter') ?? '';
  const [order, setOrder] = useState('menor');
  const [filters, setFilters] = useState(initialFilters);
  const { data: products, loading, error, retry } = useFetch(getProducts);

  const options = useMemo(() => {
    const list = products ?? [];
    return {
      brand: uniqueOptions(list, 'brand'),
      category: uniqueOptions(list, 'category'),
      gender: uniqueOptions(list, 'gender'),
      availability: uniqueOptions(list, 'availability'),
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
      const haystack = normalize(`${product.name} ${product.brand} ${product.category}`);
      if (term && !haystack.includes(term)) return false;
      return Object.entries(filters).every(
        ([key, values]) => values.length === 0 || values.includes(product[key])
      );
    });

    return filtered.sort((a, b) =>
      order === 'menor' ? finalPrice(a) - finalPrice(b) : finalPrice(b) - finalPrice(a)
    );
  }, [products, search, filters, order]);

  const title = `${search ? `Resultados para "${search}" - ` : ''}${result.length} produto${
    result.length === 1 ? '' : 's'
  }`;

  const renderContent = () => {
    if (loading) return <Loading text="Carregando produtos..." />;
    if (error) return <ErrorMessage text="Não foi possível carregar os produtos." onRetry={retry} />;
    return (
      <Section title={title} titleAlign="left">
        {result.length ? (
          <ProductListing products={result} columns={3} />
        ) : (
          <p className="listing__empty">Nenhum produto encontrado.</p>
        )}
      </Section>
    );
  };

  return (
    <Layout>
      <div className="container listing">
        <aside className="listing__aside">
          <label className="listing__order">
            <span>Ordenar por</span>
            <select value={order} onChange={(e) => setOrder(e.target.value)}>
              <option value="menor">Menor preço</option>
              <option value="maior">Maior preço</option>
            </select>
          </label>

          <div className="listing__filters">
            <h3 className="listing__filters-title">Filtrar por</h3>
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
              title="Disponibilidade"
              inputType="radio"
              options={options.availability}
              selected={filters.availability}
              onChange={toggle('availability', 'radio')}
            />
            <button type="button" className="listing__clear" onClick={() => setFilters(initialFilters)}>
              Limpar filtros
            </button>
          </div>
        </aside>

        <div className="listing__content">{renderContent()}</div>
      </div>
    </Layout>
  );
};

export default ProductListingPage;
