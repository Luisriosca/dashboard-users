<template>
    <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active">
                <p class="alert alert-warning w-100">{{content1}}</p>
            </div>
        </div>
    </div>
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
        content1: String,
        content2: String,
        content3: String,
    }
}
</script>