<template>
  <div class="container">
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column label="Name">
        <template #header>
          <el-input
              v-model="filters.name"
              placeholder="Name"
              @blur="fetchData"
              size="mini"
          ></el-input>
        </template>
        <template #default="{ row }">
          {{ row.name }}
        </template>
      </el-table-column>

      <el-table-column label="Bedrooms" class="center-column">
        <template #header>
          <el-input
              v-model="filters.bedrooms"
              @blur="fetchData"
              @input="validateNumberInput('bedrooms')"
              size="mini"
              :min="1"
              placeholder="Bedrooms"
          ></el-input>
        </template>
        <template #default="{ row }">
          {{ row.bedrooms }}
        </template>
      </el-table-column>

      <el-table-column label="Bathrooms" class="center-column">
        <template #header>
          <el-input
              v-model="filters.bathrooms"
              @blur="fetchData"
              @input="validateNumberInput('bathrooms')"
              size="mini"
              :min="1"
              placeholder="Bedrooms"
          ></el-input>
        </template>
        <template #default="{ row }">
          {{ row.bathrooms }}
        </template>
      </el-table-column>

      <el-table-column label="Storeys" class="center-column">
        <template #header>
          <el-input
              v-model="filters.storeys"
              @blur="fetchData"
              @input="validateNumberInput('storeys')"
              size="mini"
              :min="1"
              placeholder="Storeys"
          ></el-input>
        </template>
        <template #default="{ row }">
          {{ row.storeys }}
        </template>
      </el-table-column>

      <el-table-column label="Garages" class="center-column">
        <template #header>
          <el-input
              v-model="filters.garages"
              @blur="fetchData"
              @input="validateNumberInput('garages')"
              size="mini"
              :min="1"
              placeholder="Garages"
          ></el-input>
        </template>
        <template #default="{ row }">
          {{ row.garages }}
        </template>
      </el-table-column>


      <el-table-column label="Price" class="center-column">
        <template #header>
          <div style="display: flex; justify-content: space-between;">
            <el-input
                v-model="filters.priceMin"
                @blur="fetchData"
                @input="validateNumberInput('priceMin')"
                size="mini"
                :min="0"
                placeholder="Min Price"
                style="width: 45%;"
            ></el-input>
            <el-input
                v-model="filters.priceMax"
                @blur="fetchData"
                @input="validateNumberInput('priceMax')"
                size="mini"
                :min="0"
                placeholder="Max Price"
                style="width: 45%;"
            ></el-input>
          </div>
        </template>
        <template #default="{ row }">
          {{ row.price }}
        </template>
      </el-table-column>


    </el-table>


    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        v-if="total > 0"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      filters: {
        name: '',
        bedrooms: null,
        bathrooms: null,
        storeys: null,
        garages: null,
        priceMin: null,
        priceMax: null
      },
      tableData: [],
      loading: false,
      currentPage: 1,
      pageSize: 10,
      total: 0
    };
  },
  methods: {
    fetchData() {
      this.loading = true;

      // по желанию, можно пересмотреть
      let activeFilters = {};
      for (let key in this.filters) {
        if (this.filters[key] !== null && this.filters[key] !== '') {
          activeFilters[key] = this.filters[key];
        }
      }

      // тут 1 роут, можно в конфиги вынести
      axios.get('http://localhost:96/api/houses', {
        params: {
          filters: activeFilters,
          page: this.currentPage,
          per_page: this.pageSize
        }
      }).then(response => {
        this.tableData = response.data.data;
        this.total = response.data.meta.total;
        this.loading = false;
      }).catch(error => {
        console.error("Error fetching data: ", error);
        this.loading = false;
      });
    },
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.fetchData();
    },
    handleCurrentChange(newPage) {
      this.currentPage = newPage;
      this.fetchData();
    },
    validateNumberInput(field) {
      if (this.filters[field] && !/^\d*$/.test(this.filters[field])) {
        this.filters[field] = this.filters[field].replace(/[^0-9]/g, '');
      }
    },
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<style>
.el-table th {
  background-color: #f0f0f0;
  color: #333;
  font-weight: bold;
}

.el-table .cell {
  padding: 10px 0;
}

.center-column .cell, .center-column .header-cell {
  text-align: center;
}

.container {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-right: 15px;
  padding-left: 15px;

  @media (min-width: 576px) {
    max-width: 540px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 992px) {
    max-width: 960px;
  }
  @media (min-width: 1200px) {
    max-width: 1140px;
  }
}

</style>
