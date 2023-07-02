import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { subState } from "store/states";
import * as actions from "./actions";
import { Blog, BlogState } from "./types";

const initialState: BlogState = {
  getBlogsById: { ...subState, data: [], meta: null },
  getBlogs: { ...subState, data: [], meta: null },
  getBlog: { ...subState, data: null },
  updateBlog: { ...subState },
  deleteBlog: { ...subState },
  addBlog: { ...subState },
};

export const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    updateBlogsState: (state, action: PayloadAction<Blog[]>) => {
      state.getBlogs.data = {
        ...(state?.getBlogs.data ?? []),
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    // getAllBlogs
    builder.addCase(actions.getBlogs.pending, (state) => {
      state.getBlogs.loading = true;
      state.getBlogs.error = false;
    });
    builder.addCase(actions.getBlogs.fulfilled, (state, action) => {
      state.getBlogs.loading = false;
      if (action.payload) {
        const { data, meta } = action.payload;
        // so data won't be fetched again when user gets onto blogs page else data will fetched again and again
        const cleaned =
          state.getBlogs.data?.filter(
            (dataBlog) => !data.find((blog) => blog.id === dataBlog.id)
          ) ?? [];
        state.getBlogs.data = [...cleaned, ...data];
        // meta takes pagination data like total, currentPage, LastPage
        console.log("meta simple state", meta);
        state.getBlogs.meta = meta;
      }
      state.getBlogs.error = false;
    });
    builder.addCase(actions.getBlogs.rejected, (state) => {
      state.getBlogs.loading = false;
      state.getBlogs.error = true;
    });
    // getAllBlogsById
    builder.addCase(actions.getBlogsById.pending, (state) => {
      state.getBlogsById.loading = true;
      state.getBlogsById.error = false;
    });
    builder.addCase(actions.getBlogsById.fulfilled, (state, action) => {
      state.getBlogsById.loading = false;
      if (action.payload) {
        const { data, meta } = action.payload;
        // so data won't be fetched again when user gets onto blogs page else data will fetched again and again
        const cleaned =
          state.getBlogsById.data?.filter(
            (dataBlog) => !data.find((blog) => blog.id === dataBlog.id)
          ) ?? [];
        state.getBlogsById.data = [...cleaned, ...data];
        // meta takes pagination data like total, currentPage, LastPage
        console.log("meta for ID", meta);
        state.getBlogsById.meta = meta;
      }
      state.getBlogsById.error = false;
    });
    builder.addCase(actions.getBlogsById.rejected, (state) => {
      state.getBlogsById.loading = false;
      state.getBlogsById.error = true;
    });
    // getBlogBySlug
    builder.addCase(actions.getBlog.pending, (state) => {
      state.getBlog.loading = true;
      state.getBlog.error = false;
    });
    builder.addCase(actions.getBlog.fulfilled, (state, action) => {
      state.getBlog.loading = false;
      if (action.payload) {
        state.getBlog.data = { ...action.payload };
      }
      state.getBlog.error = false;
    });
    builder.addCase(actions.getBlog.rejected, (state) => {
      state.getBlog.loading = false;
      state.getBlog.error = true;
    });
    // addBlog
    builder.addCase(actions.addBlog.pending, (state) => {
      state.addBlog = { loading: true, error: false };
    });
    builder.addCase(actions.addBlog.fulfilled, (state) => {
      state.addBlog = { loading: false, error: false };
    });
    builder.addCase(actions.addBlog.rejected, (state) => {
      state.addBlog = { loading: false, error: true };
    });
    // deleteBlog
    builder.addCase(actions.deleteBlog.pending, (state) => {
      state.deleteBlog = { loading: true, error: false };
    });
    builder.addCase(actions.deleteBlog.fulfilled, (state, action) => {
      state.deleteBlog = { loading: false, error: false };
      if (action.payload) {
        const deletedBlogId = action.payload;
        state.getBlogs.data = state.getBlogs.data.filter(
          (blog) => blog.id !== deletedBlogId
        );
      }
    });
    builder.addCase(actions.deleteBlog.rejected, (state) => {
      state.deleteBlog = { loading: false, error: true };
    });
    // updateBlog
    builder.addCase(actions.updateBlog.pending, (state) => {
      state.updateBlog = { loading: true, error: false };
    });
    builder.addCase(actions.updateBlog.fulfilled, (state) => {
      state.updateBlog = { loading: false, error: false };
    });
    builder.addCase(actions.updateBlog.rejected, (state) => {
      state.updateBlog = { loading: false, error: true };
    });
  },
});

export default blogSlice.reducer;
