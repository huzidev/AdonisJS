
export default function Form() {
  return (
    <div>
        <h1>
            Add blogs
        </h1>
        <input type="text" name="title" placeholder="Article's Title"/>
        <input type="file" name="image" />
        <textarea name="content" id="" cols="30" rows="10" placeholder="Enter Yours Text Here"></textarea>
    </div>
  )
}
