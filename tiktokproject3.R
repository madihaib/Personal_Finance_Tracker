library(ggplot2)
library(rstan)

data_list <- list(
  N=10,
  y=7
)

fit <- stan(
  file= "free_throw.stan",
  data= data_list,
  chains = 4,
  iter = 2000,
  warmup=500,
  seed =123
)

print(fit, pars = "theta")

posterior_samples <- extract(fit)$theta

qplot(posterior_samples, geom= "histogram", bins =30,
      xlab="Free Throw % (0)", ylab= "Density", main = "Posterior Distribution of Free Throw Percentage"
)
      