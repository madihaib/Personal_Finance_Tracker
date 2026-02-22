library(tidyverse)
library(hoopR)

nba_data <- hoopR::load_nba_player_box(year=2024)

top_scorers <- nba_data %>%
  filter(did_not_play == FALSE | is.na(did_not_play))%>%
  group_by(athlete_display_name, team_abbreviation)%>%
  summarise(
    games_played = n(),
    avg_points = mean(points,na.rm = TRUE),
    .groups = "drop"
  ) %>%
  filter(games_played>=30)%>%
  arrange(desc(avg_points)) %>%
  slice_head (n = 10)

ggplot(top_scorers, aes (
  x= reorder(athlete_display_name, avg_points),
  y= avg_points,
  fill= team_abbreviation
))+
  geom_col(fill= "steelblue")+
  geom_text(aes(label=round(avg_points,1)),hjust = -0.2,size=5)+
  coord_flip()+
  scale_y_continuous(expand=expansion(mult = c(0,0.15)))+
  labs(
      title="Top 10 NBA Scorers(2023-2024)",
      x="Player",
      y= "Avg Points per Game"
  )+
  theme_minimal(base_size = 14)+
  theme(
    plot.title = element_text(face = "bold", hjust = 0.5, size= 16),
    axis.text.y = element_text(size=12),
    axis.text.x = element_text(size=10),
    legend.position ="none"
  )

  