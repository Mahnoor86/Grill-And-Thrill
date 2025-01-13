import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category, setCategory}) => {
  return (
    <div className='Explore-Menu' id='Explore-Menu'>
      <h1>Explore Our Menu</h1>
      <p className='Explore-Menu-Text'>Explore our menu and embark on a culinary journey of delicious possibilities. Whether you're in the mood for classic comfort food or innovative new flavors, our selection has something to delight every palate. 
      Each dish is crafted with care, using the freshest ingredients to ensure a memorable dining experience with every bite.</p>
      <div className='Explore-Menu-List'> 
      {menu_list.map((item, index)=>{
        return(
            <div onClick={()=>setCategory(prev=>prev===item.menu_name? "All" : item.menu_name)} key={index} className='Explore-Menu-List-Item'>
             <img  className={category===item.menu_name?"active":""} src={item.menu_image} alt="cart"/>
             <p>{item.menu_name}</p>
            </div>

        )
      }

      )}
      </div>
      <hr></hr>

    </div>
  )
}

export default ExploreMenu
