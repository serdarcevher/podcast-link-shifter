<template>
    <li>
        <div v-if="element.duration"> <!-- this is an ad -->
            <Ad :data-ad="element" v-show="isAdsVisible" :key="'r_a_' + index" :is-result-item="true"></Ad>
        </div>

        <div v-else>
            <ListElement :data-element="element" :key="'r_l_' + index" :is-result-item="true"></ListElement>
        </div>
    </li>
</template>

<script>
import Ad from './Ad';
import ListElement from './ListElement';
export default {
    props:['element', 'is-ads-visible', 'index'],
    components: {
        Ad, ListElement
    },
    data() {
        return {}
    },
}
</script>