<template>
    <v-data-iterator :items="dataIterator1">
        <template v-slot:default="props">
            <v-row>
                <v-col v-for="item in props.items" :key="item.id.value" cols="12" sm="6" md="4" lg="3" >
                    <v-card>
                        <v-list class="d-flex justify-content-center">
                            <v-list-item-avatar :size="62"> 
                                <v-img
                                    :alt="`${item.name.first} avatar`"
                                    :src="item.picture.thumbnail"
                                ></v-img>
                            </v-list-item-avatar>
                        </v-list>

                        <v-list class="justify-center" dense>
                            <v-list-item>
                                <v-list-item-content class="justify-center">
                                {{ item.name.first  + ' ' +  item.name.last}}
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>

                        <v-list class="justify-center" dense>
                            <v-list-item>
                                <v-list-item-content class="justify-center">
                                {{item.email}}
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>

                    </v-card>
                </v-col>
            </v-row>

        </template>
    </v-data-iterator>
</template>

<script>
export default { 
    data() {
        return {

        }
    },
    methods: {
    },
    props: {
        dataIterator1: Object,
    }
}
</script>