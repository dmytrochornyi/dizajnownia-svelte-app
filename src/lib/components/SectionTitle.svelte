<script>
  export let line1 = "";
  export let line2 = "";
  export let line3 = "";
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;700;800&display=swap');
  .avenir-black {
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
  }
  .blue-accent {
    background-color: #517bbd;
  }
  .text-blue-accent {
    color: #517bbd;
  }
</style>

<div class="relative w-full max-w-4xl mx-auto">
  <!-- Vertical blue line -->
  <div class="absolute left-4 md:left-8 w-3 h-96 blue-accent top-0"></div>
  <!-- Small blue square -->
  <div class="absolute left-8 md:left-16 w-5 h-5 blue-accent -bottom-10"></div>
  <!-- Main title sections -->
  <div class="pl-12 md:pl-20 space-y-4 md:space-y-0 text-left">
    <h2 class="avenir-black text-6xl md:text-8xl text-blue-accent leading-none text-left">{line1}</h2>
    <h2 class="avenir-black text-6xl md:text-8xl text-blue-accent leading-none text-left">{line2}</h2>
    <h2 class="avenir-black text-6xl md:text-8xl text-blue-accent leading-none text-left">{line3}</h2>
  </div>
</div>
