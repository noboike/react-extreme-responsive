# react-extreme-responsive
A smart solution for responsive ui

* Usage

the component should wrap the hole app, so when the window witdh is smaller than 500px it will scale down, and when it higher than 500px the scale ratio will be 1
```tsx
<body>
<ExtremeResponsive minWidth={500}>
  <Nav />
  <Hero />
  <Footer />
</ExtremeResponsive>
</body>
```
