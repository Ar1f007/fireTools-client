import {
  Banner,
  FAQs,
  NewsLetter,
  OrderProcess,
  Reviews,
  Summary,
  Tools,
  TrendingProducts,
} from '../components';

export const Home = () => {
  return (
    <>
      <Banner />
      <TrendingProducts />
      <Tools />
      <Summary />
      <Reviews />
      <OrderProcess />
      <FAQs />
      <NewsLetter />
    </>
  );
};
