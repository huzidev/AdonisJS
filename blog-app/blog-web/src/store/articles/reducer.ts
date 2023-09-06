import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { subState } from "store/states";
import * as actions from "./actions";
import { BlogState, getBlogById } from "./types";

const initialState: BlogState = {
  getBlogsById: { ...subState, data: [], meta: null },
  getMyList: { ...subState, data: [], meta: null },
  getFavoriteBlogs: { ...subState, data: [], meta: null },
  getBlogs: {
    ...subState,
    data: [],
    meta: null,
  },
  getBlogsList: {
    ...subState,
    data: [],
    meta: null,
  },
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
        const { data, meta, filters, message } = action.payload;
        if (filters) {
          // state.getBlogs.data mean whne user is no blogs page then default list will be shown to user and currentPage will be 1 hence when user called filters
          // then replace the recent data with new data therefore we haven't used [...state.geBlogs.data, ...data] because spread operator will append new data with old data
          if (state.getBlogs.data && meta.currentPage === 1) {
            state.getBlogs.data = data;
          }
          // if filters condition is TRUE and we've already some data then because the FILTER state is TRUE this means previous data is accordin to filter
          // hence append new data with the old data currentPage not 1 means user called the LOAD MORE button
          else if (state.getBlogs.data && meta.currentPage !== 1) {
            const cleaned = JSON.parse(JSON.stringify(state.getBlogs.data));
            state.getBlogs.data = [...cleaned, ...data];
          }
        } else {
          if (meta.currentPage === 1) { 
            state.getBlogs.data = data;
          } else {
            const cleaned = JSON.parse(JSON.stringify(state.getBlogs.data));
            state.getBlogs.data = [...cleaned, ...data];
          }
        }
        // meta takes pagination data like total, currentPage, LastPageX
        state.getBlogs.meta = meta;
        state.getBlogs.message = message;
      }
      state.getBlogs.error = false;
    });
    builder.addCase(actions.getBlogs.rejected, (state) => {
      state.getBlogs.loading = false;
      state.getBlogs.error = true;
    });
    // when admin clicked on manage Blogs
    builder.addCase(actions.getBlogsList.pending, (state) => {
      state.getBlogsList.loading = true;
      state.getBlogsList.error = false;
    });
    builder.addCase(actions.getBlogsList.fulfilled, (state, action) => {
      state.getBlogsList.loading = false;
      if (action.payload) {
        const { data, meta, message } = action.payload;
        state.getBlogsList.data = [...data];
        state.getBlogsList.meta = meta;
        state.getBlogsList.message = message;
      }
      state.getBlogsList.error = false;
    });
    builder.addCase(actions.getBlogsList.rejected, (state) => {
      state.getBlogsList.loading = false;
      state.getBlogsList.error = true;
    });
    // getAllBlogsById
    builder.addCase(actions.getBlogsById.pending, (state) => {
      state.getBlogsById.loading = true;
      state.getBlogsById.error = false;
    });
    builder.addCase(actions.getBlogsById.fulfilled, (state, action) => {
      state.getBlogsById.loading = false;
      if (action.payload) {
        const { data, meta, message } = action.payload;
          const cleaned = JSON.parse(JSON.stringify(state.getBlogsById.data));
          state.getBlogsById.data = [...data];
          if (meta.currentPage !== 1) {
            // so when user clicked on load more then previous data remains save and fetches new data
            state.getBlogsById.data = [...cleaned, ...data];
          }
          
          state.getBlogsById.message = message
          state.getBlogsById.meta = meta;
        }
      state.getBlogsById.error = false;
    });
    builder.addCase(actions.getBlogsById.rejected, (state) => {
      state.getBlogsById.loading = false;
      state.getBlogsById.error = true;
    });
    // when blogger clicked on manage blogs
    builder.addCase(actions.getMyList.pending, (state) => {
      state.getMyList.loading = true;
      state.getMyList.error = false;
    });
    builder.addCase(actions.getMyList.fulfilled, (state, action) => {
      state.getMyList.loading = false;
      if (action.payload) {
        const { data, meta, message } = action.payload;
        // created a seprate condition for getMyList so when user clicked on manage blogs then a table is shown with all the blogs uploaded by that user now we've
        // created a condition in getBlogsById which is that when user clicked on LoadMore then previous data remains save and new data appends in array BUT for table
        // we wanted previous data to be vanished and just show new data so when user CLICKED on next page then just new data must shown not the previous data
        state.getMyList.data = data;
        state.getMyList.message = `Yours ${message}`;
        // meta takes pagination data like total, currentPage, LastPage
        state.getMyList.meta = meta;
      }
      state.getMyList.error = false;
    });
    builder.addCase(actions.getMyList.rejected, (state) => {
      state.getMyList.loading = false;
      state.getMyList.error = true;
    });
    // getBlogBySlug
    builder.addCase(actions.getBlog.pending, (state) => {
      state.getBlog.loading = true;
      state.getBlog.error = false;
    });
    builder.addCase(actions.getBlog.fulfilled, (state, action) => {
      state.getBlog.loading = false;
      if (action.payload) {
        const { data, message } = action.payload;
        state.getBlog.data = data;
        state.getBlog.message = message;
      }
      state.getBlog.error = false;
    });
    builder.addCase(actions.getBlog.rejected, (state) => {
      state.getBlog.loading = false;
      state.getBlog.error = true;
      // // so if user tries to chnage URL and gets no such article is found then navigate user to blogs page by checking error message if it contains status code 404
      // // when no such article is found error is formed then status code will be 404
      // state.getBlog.message = action.error.message;
    });
    // addBlog
    builder.addCase(actions.addBlog.pending, (state) => {
      state.addBlog = { loading: true, error: false };
    });
    builder.addCase(actions.addBlog.fulfilled, (state, action) => {
      state.addBlog = { loading: false, error: false };
      if (action.payload) {
        const { data, message } = action.payload;
        // Update new blog in allBlogs page
        const cleanedBlogs = JSON.parse(JSON.stringify(state.getBlogs.data));
        state.getBlogs.data = [...cleanedBlogs, data];
        // Update new blog in ViewProfile page
        const cleanedUserBlog = JSON.parse(JSON.stringify(state.getBlogs.data));
        state.getBlogsById.data = [...cleanedUserBlog, data];
        state.addBlog.message = message;
      }
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
        const { id, message } = action.payload;
        const deletedBlogId = id;
        // calling .filter to updated the allBlogs data after removing the deleted blog with id
        // when user delete the blog from main blogs page
        state.getBlogs.data = JSON.parse(JSON.stringify(
          state.getBlogs.data.filter(
            (blog) => blog.id !== deletedBlogId
          ))) 
        // // when user delete the blog from ViewProfile page
        state.getBlogsById.data = JSON.parse(JSON.stringify(
          state.getBlogsById.data.filter(
           (blog) => blog.id !== deletedBlogId
         ))) 
        state.deleteBlog.message = message;
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
      // const updateBlog = JSON.parse(JSON.stringify(state.getBlogs.data.find((blog) => blog.id === data.id)));
      // // to put updated value in the getBlogs data
      // state.getBlogs.data = [updateBlog];
      state.updateBlog.message = message;
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
        // it is COMPUSLORY to called cleaned variable here above state.getFavoriteBlogs.data = data otherwise the new data will overwrite the previous data with new data
        const cleaned = JSON.parse(JSON.stringify(state.getFavoriteBlogs.data));
        state.getFavoriteBlogs.data = data;
        if (meta.currentPage !== 1) {
          // so when user clicked on load more then save the previous data and append the new data in the list WITHOUT losing the previous data
          state.getFavoriteBlogs.data = [...cleaned, ...data];
        }
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
    builder.addCase(actions.addFavoriteBlog.fulfilled, (state, action) => {
      state.addFavoriteBlog.loading = false;
      if (action.payload) {
        const { message, data } = action.payload
        // because by default data state.getBlogs.data is in form of this Proxy(Array) {0: {…}} therefore used JSON.parse
          const cleaned = JSON.parse(JSON.stringify(state.getBlogs.data.find((blog) => blog.id === data.articleId)));
          const prevBlog = JSON.parse(JSON.stringify(state.getFavoriteBlogs.data));
          state.getFavoriteBlogs.data = [...prevBlog, cleaned];
        state.addFavoriteBlog.message = message;
      }
      state.addFavoriteBlog.error = false
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
        const { message, id } = action.payload;
        state.getFavoriteBlogs.data = JSON.parse(JSON.stringify(
          state.getFavoriteBlogs.data.filter(
           (blog) => blog.id !== id
         )
        ))
        state.removeFavoriteBlog.message = message;
      }
    });
    builder.addCase(actions.removeFavoriteBlog.rejected, (state) => {
      state.removeFavoriteBlog = { loading: false, error: true };
    });
  },
});

export default blogSlice.reducer;
