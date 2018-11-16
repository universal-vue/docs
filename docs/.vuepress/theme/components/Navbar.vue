<template>
  <header class="navbar">
    <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')"/>

    <router-link
      :to="$localePath"
      class="home-link"
    >
      <img
        class="logo"
        v-if="$site.themeConfig.logo"
        :src="$withBase($site.themeConfig.logo)"
        :alt="$siteTitle"
      >
      <span
        ref="siteName"
        class="site-name"
        v-if="$siteTitle"
        :class="{ 'can-hide': $site.themeConfig.logo }"
      >{{ $siteTitle }}</span>
    </router-link>

    <NavLinks class="can-hide"/>

    <div
      class="links"
      :style="{
        'max-width': linksWrapMaxWidth + 'px'
      }"
    >
      <AlgoliaSearchBox
        v-if="isAlgoliaSearch"
        :options="algolia"
      />
      <SearchBox v-else-if="$site.themeConfig.search !== false"/>
      
      <div>
        <a href="https://discord.gg/3ZZBmFs" target="_blank">
          <svg id="chat" class="picto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="message-circle"><rect width="24" height="24" opacity="0"/><path d="M19.07 4.93a10 10 0 0 0-16.28 11 1.06 1.06 0 0 1 .09.64L2 20.8a1 1 0 0 0 .27.91A1 1 0 0 0 3 22h.2l4.28-.86a1.26 1.26 0 0 1 .64.09 10 10 0 0 0 11-16.28zM8 13a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm4 0a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm4 0a1 1 0 1 1 1-1 1 1 0 0 1-1 1z"/></g></g></svg>
        </a>
        
        <a href="https://github.com/universal-vue/uvue" target="_blank">
          <svg id="github" class="picto" xmlns="http://www.w3.org/2000/svg" width="161.033" height="157.058" viewBox="0 0 42.607 41.555"><path d="M21.304 0C9.539 0 0 9.538 0 21.304 0 30.716 6.104 38.7 14.569 41.518c1.064.198 1.455-.462 1.455-1.024 0-.508-.02-2.187-.029-3.967-5.926 1.289-7.177-2.513-7.177-2.513-.97-2.463-2.365-3.117-2.365-3.117-1.933-1.323.145-1.295.145-1.295 2.14.15 3.266 2.195 3.266 2.195 1.9 3.257 4.984 2.315 6.2 1.77.19-1.376.743-2.316 1.352-2.848-4.732-.539-9.706-2.365-9.706-10.528 0-2.326.832-4.226 2.195-5.718-.221-.537-.95-2.704.206-5.638 0 0 1.79-.573 5.86 2.184a20.42 20.42 0 0 1 5.333-.717c1.81.008 3.634.245 5.336.717 4.066-2.757 5.853-2.184 5.853-2.184 1.16 2.934.43 5.1.209 5.638 1.366 1.492 2.192 3.392 2.192 5.718 0 8.182-4.983 9.984-9.727 10.511.764.661 1.445 1.958 1.445 3.945 0 2.85-.025 5.145-.025 5.847 0 .567.384 1.23 1.463 1.022 8.46-2.82 14.557-10.803 14.557-20.212C42.607 9.538 33.069 0 21.304 0" fill="#1b1817" fill-rule="evenodd"/></svg>
        </a>
      </div>

      <!-- <nav
        class="nav-links"
      >
        <div
          class="nav-item"
          v-for="item in afterLinks"
          :key="item.link"
        >
          <NavLink
            :item="item"
          />
        </div>
      </nav> -->
    </div>
  </header>
</template>

<script>
import SidebarButton from './SidebarButton.vue';
import AlgoliaSearchBox from '@AlgoliaSearchBox';
import SearchBox from '@SearchBox';
import NavLinks from './NavLinks.vue';
import NavLink from './NavLink.vue';

export default {
  components: { SidebarButton, NavLink, NavLinks, SearchBox, AlgoliaSearchBox },

  data() {
    return {
      linksWrapMaxWidth: null,
      afterLinks: [
        { text: 'Chat', link: 'https://discord.gg/3ZZBmFs', type: 'link', items: [] },
        { text: 'Github', link: 'https://github.com/universal-vue', type: 'link', items: [] },
      ],
    };
  },

  mounted() {
    const MOBILE_DESKTOP_BREAKPOINT = 719; // refer to config.styl
    const NAVBAR_VERTICAL_PADDING =
      parseInt(css(this.$el, 'paddingLeft')) + parseInt(css(this.$el, 'paddingRight'));
    const handleLinksWrapWidth = () => {
      if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
        this.linksWrapMaxWidth = null;
      } else {
        this.linksWrapMaxWidth =
          this.$el.offsetWidth -
          NAVBAR_VERTICAL_PADDING -
          ((this.$refs.siteName && this.$refs.siteName.offsetWidth) || 0);
      }
    };
    handleLinksWrapWidth();
    window.addEventListener('resize', handleLinksWrapWidth, false);
  },

  computed: {
    algolia() {
      return this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {};
    },

    isAlgoliaSearch() {
      return this.algolia && this.algolia.apiKey && this.algolia.indexName;
    },
  },
};

function css(el, property) {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const win = el.ownerDocument.defaultView;
  // null means not to return pseudo styles
  return win.getComputedStyle(el, null)[property];
}
</script>

<style lang="stylus">
$navbar-vertical-padding = 0.7rem
$navbar-horizontal-padding = 1.5rem

.navbar
  padding $navbar-vertical-padding $navbar-horizontal-padding
  line-height $navbarHeight - 1.4rem
  a, span, img
    display inline-block
  .logo
    height $navbarHeight - 1.4rem
    min-width $navbarHeight - 1.4rem
    margin 0 0.8rem
    vertical-align top
  .site-name
    font-size 1.3rem
    font-weight 600
    color $textColor
    position relative
  .links
    padding-left 1.5rem
    box-sizing border-box
    background-color white
    white-space nowrap
    font-size 0.9rem
    position absolute
    right $navbar-horizontal-padding
    top $navbar-vertical-padding
    display flex
    .search-box
      flex: 0 0 auto
      vertical-align top
    .nav-links
      flex 1

@media (max-width: $MQMobile)
  .navbar
    padding-left 4rem
    .can-hide
      display none
    .links
      padding-left 1.5rem
a
  .picto
    width 24px
    height 24px
    padding 1rem 0.33rem 0.33rem 0
    path
      transition fill 0.2s ease-out;
      fill #ccc

a:hover
  .picto
    path 
      fill #555

@media (max-width: 719px)
  .search-box
    margin-right 2rem
</style>
