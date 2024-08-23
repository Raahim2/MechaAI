import React from "react"
import "../CSS/features.css"

function FeaturesBlock() {
  

  return (
    <>
     <h1 className="center heading">Our features</h1>

<div>
  <div className="ag-format-container">
    <div className="ag-courses_box">

      <div className="ag-courses_item">
        <a href="#" className="ag-courses-item_link">
          <div className="ag-courses-item_bg"></div>
  
          <div className="ag-courses-item_title">
            <div>
              <img src="/static/svg/components/filter.svg" alt="" width="40px" className="invert"/>
            </div>
            Powerful Filters
          </div>
  
          <div className="ag-courses-item_date-box">
            Apply a variety of filters to enhance your images and give them a unique touch with just a click.
          </div>
        </a>
      </div>

      <div className="ag-courses_item">
        <a href="#" className="ag-courses-item_link">
          <div className="ag-courses-item_bg"></div>
  
          <div className="ag-courses-item_title">
            <div>
              <img src="/static/svg/components/crop.svg" alt="" width="40px" className="invert"/>
            </div>
            Advanced Editing Tools
          </div>
  
          <div className="ag-courses-item_date-box">
            From cropping and resizing to adjusting brightness, contrast, and saturation, our editing tools provide you with everything you need to perfect your images.
          </div>
        </a>
      </div>

      <div className="ag-courses_item">
        <a href="#" className="ag-courses-item_link">
          <div className="ag-courses-item_bg"></div>
  
          <div className="ag-courses-item_title">
            <div>
              <img src="/static/svg/components/text.svg" alt="" width="40px" className="invert"/>
            </div>
            Text and Typography
          </div>
  
          <div className="ag-courses-item_date-box">
            Add text overlays to your images with a wide range of fonts, sizes, and styles to choose from.
          </div>
        </a>
      </div>

      <div className="ag-courses_item">
        <a href="#" className="ag-courses-item_link">
          <div className="ag-courses-item_bg"></div>
  
          <div className="ag-courses-item_title">
            <div>
              <img src="/static/svg/components/bg.svg" alt="" width="40px" className="invert"/>
            </div>
            Object Recognition
          </div>
  
          <div className="ag-courses-item_date-box">
            Apply a variety of filters to enhance your images and give them a unique touch with just a click.
          </div>
        </a>
      </div>

      <div className="ag-courses_item">
        <a href="#" className="ag-courses-item_link">
          <div className="ag-courses-item_bg"></div>
  
          <div className="ag-courses-item_title">
            <div>
              <img src="/static/svg/components/adjust/dark.svg" alt="" width="40px" className="invert"/>
            </div>
            Save & Export
          </div>
  
          <div className="ag-courses-item_date-box">
            Save edited images in various formats (JPEG, PNG, etc.) and resolutions, and export them to your device or cloud storage.
          </div>
        </a>
      </div>

      <div className="ag-courses_item">
        <a href="#" className="ag-courses-item_link">
          <div className="ag-courses-item_bg"></div>
  
          <div className="ag-courses-item_title">
            <div>
              <img src="/static/svg/components/ai/detect.svg" alt="" width="40px" className="invert"/>
            </div>
            Instant Sharing
          </div>
  
          <div className="ag-courses-item_date-box">
            Once you're satisfied with your edits, easily share your images directly to social media platforms or download them in various formats for further use.
          </div>
        </a>
      </div>

    
      
  
    </div>
  </div>
  
  
</div>   


    </>
  )
}

export default FeaturesBlock
