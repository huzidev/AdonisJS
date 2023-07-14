import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { subState } from "store/states";
import * as actions from "./actions";
import { BlogState, getBlogById } from "./types";

const initialState: BlogState = {
  getBlogsById: { ...subState, data: [], meta: null },
  getFavoriteBlogs: { ...subState, data: [], meta: null },
  getBlogs: { ...subState, data: [], meta: null },
  getBlog: { ...subState, data: null },
  updateBlog: { ...subState, data: null },
  deleteBlog: { ...subState },
  addBlog: { ...subState },
  addFavoriteBlog: { ...subState },
  removeFavoriteBlog: { ...subState }
};

export const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    updateBlog: (state, action: PayloadAction<getBlogById>) => {
      state.getBlogs.data = {
        ...(state?.getBlogs.data ?? []),
        ...action.payload.data,
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
        state.getBlogs.message = "Blogs fetched successfully"
        // meta takes pagination data like total, currentPage, LastPage
        state.getBlogs.meta = meta;
      }
      state.getBlogs.error = false;
    });
    builder.addCase(actions.getBlogs.rejected, (state) => {
      state.getBlogs.loading = false;
      state.getBlogs.error = true;
      state.getBlogs.message = "Something went wrong"
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
        const { article, message } = action.payload
        state.getBlog.data = { ...article };
        state.getBlog.message = message;
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
      // so after deleting the blog the blogs data will updated
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
    builder.addCase(actions.updateBlog.fulfilled, (state, action) => {
      state.updateBlog.loading = false;
      const { data, message } = action.payload; 
      const updatedAllBlogs = state.getBlogs.data.map((blog) => {
        if (blog.id === data.id) {
          return data;
        }
        return blog;
      });
      state.updateBlog.message = message;
      // Update the allBlogs data in the state
      // getBlogs because updating the updated blog value in getBlogs list
      state.getBlogs.data = updatedAllBlogs;
      state.updateBlog.error = false;
    });
    builder.addCase(actions.updateBlog.rejected, (state) => {
      state.updateBlog = { loading: false, error: true };
    });
    // getFavoriteBlogs
    builder.addCase(actions.getFavoriteBlogs.pending, (state) => {
      state.getFavoriteBlogs.loading = true;
      state.getFavoriteBlogs.error = false;
    });
    builder.addCase(actions.getFavoriteBlogs.fulfilled, (state, action) => {
      state.getFavoriteBlogs.loading = false;
      if (action.payload) {
        const { data, meta } = action.payload;
        // so data won't be fetched again when user gets onto blogs page else data will fetched again and again
        const cleaned =
          state.getFavoriteBlogs.data?.filter(
            (dataBlog) => !data.find((blog) => blog.id === dataBlog.id)
          ) ?? [];
        state.getFavoriteBlogs.data = [...cleaned, ...data];
        // meta takes pagination data like total, currentPage, LastPage
        state.getFavoriteBlogs.meta = meta;
      }
      state.getFavoriteBlogs.error = false;
    });
    builder.addCase(actions.getFavoriteBlogs.rejected, (state) => {
      state.getFavoriteBlogs.loading = false;
      state.getFavoriteBlogs.error = true;
    });
    // addFavoriteBlog
    builder.addCase(actions.addFavoriteBlog.pending, (state) => {
      state.addFavoriteBlog = { loading: true, error: false };
    });
    builder.addCase(actions.addFavoriteBlog.fulfilled, (state) => {
      state.addFavoriteBlog = { loading: false, error: false };
    });
    builder.addCase(actions.addFavoriteBlog.rejected, (state) => {
      state.addFavoriteBlog = { loading: false, error: true };
    });
    // removeFavoriteBlog
    builder.addCase(actions.removeFavoriteBlog.pending, (state) => {
      state.removeFavoriteBlog = { loading: true, error: false };
    });
    builder.addCase(actions.removeFavoriteBlog.fulfilled, (state, action) => {
      state.removeFavoriteBlog = { loading: false, error: false };
      // to update the getFavoriteBlogs field when removed the blog
      if (action.payload) {
        const deletedBlogId = action.payload;
        state.getFavoriteBlogs.data = state.getFavoriteBlogs.data.filter(
          (blog) => blog.id !== deletedBlogId
        );
      }
    });
    builder.addCase(actions.removeFavoriteBlog.rejected, (state) => {
      state.removeFavoriteBlog = { loading: false, error: true };
    });
  },
});

export default blogSlice.reducer;
