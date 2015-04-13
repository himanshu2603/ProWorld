﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProWorldz.DL.Models
{
    public class City :BaseClass
    {
        [Key]
        public int Id { get; set; }

        [Required]//check unique user name
        public string Name { get; set; }

        [ForeignKey("Country")]//check unique user name
        public int CountryId { get; set; }

        public virtual Country Country { get; set; }
    }
}
