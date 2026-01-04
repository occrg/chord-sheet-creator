<script lang="ts" setup>
  import type { PropType } from "vue";
  </script>
  
  <template>
    <div class="vertical-layout primary-middle"
      :class="{ 'rotate-180': ICONS_FLIPPED_VERTICALLY.includes(iconChoice) }">
        <svg v-if="(iconChoice == IconChoice.CHEVRON_UP) || (iconChoice == IconChoice.CHEVRON_DOWN)" :width="ICON_SIZE_TO_WIDTH[iconSize]" viewBox="0 0 28 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 2L14 14L26 2" stroke="#3F1E00" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg v-if="iconChoice == IconChoice.BIN" :width="ICON_SIZE_TO_WIDTH[iconSize]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.0001 9C19.8955 9 19.0001 9.89543 19.0001 11V15C19.0001 17.8284 18.9998 19.2424 18.1212 20.1211C17.2425 20.9998 15.8285 21 13.0001 21H11.0001C8.17163 21 6.75765 20.9998 5.87897 20.1211C5.00029 19.2424 5.00006 17.8284 5.00006 15V11C5.00006 9.89543 4.10463 9 3.00006 9V6H21.0001V9ZM9.50006 10C8.94778 10 8.50006 10.4477 8.50006 11V16C8.50006 16.5523 8.94778 17 9.50006 17C10.0523 17 10.5001 16.5523 10.5001 16V11C10.5001 10.4477 10.0523 10 9.50006 10ZM14.5001 10C13.9478 10 13.5001 10.4477 13.5001 11V16C13.5001 16.5523 13.9478 17 14.5001 17C15.0523 17 15.5001 16.5523 15.5001 16V11C15.5001 10.4477 15.0523 10 14.5001 10Z" fill="#3F1E00"/>
            <path d="M10.0681 3.37059C10.1821 3.26427 10.4332 3.17033 10.7825 3.10332C11.1318 3.03632 11.5597 3 12 3C12.4403 3 12.8682 3.03632 13.2175 3.10332C13.5668 3.17033 13.8179 3.26427 13.9319 3.37059" stroke="#3F1E00" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <svg v-if="iconChoice == IconChoice.PLUS" :width="ICON_SIZE_TO_WIDTH[iconSize]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 3L12 21" stroke="#3F1E00" stroke-width="3" stroke-linecap="round"/>
            <path d="M21 12L3 12" stroke="#3F1E00" stroke-width="3" stroke-linecap="round"/>
        </svg>
    </div>
  </template>
  
  <script lang="ts">
  export enum IconSize {
      SMALL,
      MEDIUM,
      LARGE
  }
  
  export enum IconChoice {
    CHEVRON_UP,
    CHEVRON_DOWN,
    BIN,
    PLUS
  }
  
  const ICONS_FLIPPED_VERTICALLY = [IconChoice.CHEVRON_UP];
  
  const ICON_SIZE_TO_WIDTH = {
      [IconSize.SMALL]: "1.5rem",
      [IconSize.MEDIUM]: "1.75rem",
      [IconSize.LARGE]: "2rem"
  }
  
  export default {
    name: "icon",
    props: {
      iconChoice: {
        type: Number as PropType<IconChoice>,
        required: true
      },
      iconSize: {
        type: Number as PropType<IconSize>,
        required: true
      }
    }
  };
  </script>