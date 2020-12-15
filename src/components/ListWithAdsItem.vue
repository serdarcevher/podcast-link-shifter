<template>
    <li>
        <div v-if="element.duration"> <!-- this is an ad -->
            <Ad :data-ad="element" v-show="isAdsVisible"></Ad>
        </div>

        <div v-else>
            <ListElement :data-element="element"></ListElement>
        </div>
    </li>
</template>

<script>
import Ad from './Ad';
import ListElement from './ListElement';
export default {
    props:['element', 'is-ads-visible'],
    components: {
        Ad, ListElement
    },
    data() {
        return {}
    },
}
</script>