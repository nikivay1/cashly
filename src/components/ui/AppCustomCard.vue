<script setup></script>

<template>
    <div class="item-card flex">
        <div class="action-block flex-row p-1">
            <div class="flex gap-2">
                <slot name="actions"></slot>
            </div>
            <div class="left"></div>
            <div class="right"></div>
        </div>
        <div class="flex-row">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<style scoped lang="scss">
.item-card {
    background-color: #eaff00;
    color: var(--main-bg-color);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    position: relative;
    font-family: Arial, sans-serif;
}

.action-block {
    position: absolute;
    background: var(--main-bg-color);
    top: 0;
    right: 0;
    border-bottom-left-radius: 23px;
    .button {
        background-color: #eaff00;
        color: var(--main-bg-color);
        border: none;
        border-radius: 20px;
        font-size: 14px;
        cursor: pointer;
        &:hover {
            background: var(--main-bg-color);
        }
    }
    .right {
        bottom: -20px;
        right: 0;
    }
    .left {
        top: 0;
        left: -20px;
    }
    .left,
    .right {
        position: absolute;
        width: 20px;
        height: 20px;
        background: var(--main-bg-color);
        &::after {
            content: '';
            display: block;
            width: 20px;
            height: 20px;
            background-color: #eaff00;
            border-top-right-radius: 20px;
        }
    }
}
</style>
