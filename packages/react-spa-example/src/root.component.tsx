import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

export default function Root(props) {
  return <BrowserRouter>
    <Routes>
      <Route path="/react-example">
        <Route index element={
          <section>{props.name} is mounted! <Link to="about">Go to About page</Link></section>
        } />
        <Route path="about" element={<h1>About page</h1>} />        
        <Route path="*" element={
          <section>Unknown page of /react-example</section>
        } />
      </Route>
    </Routes>
  </BrowserRouter>
}
