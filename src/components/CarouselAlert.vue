<template>
    <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active">
                <span class="alert alert-warning w-100">{{content1}}</span>
            </div>
            <div class="carousel-item">
                <span class="alert alert-warning w-100">{{content2}}</span>
            </div>
            <div class="carousel-item">
                <span class="alert alert-warning w-100">{{content3}}</span>
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
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